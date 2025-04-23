from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import Response
from rest_framework.views import APIView
from rest_framework import status
from api.models import Country, Comment, CountryList, Tour, Tourist
from api.serializers import CountrySerializer, CommentSerializer, CountryListSerializer, TourSerializer, TouristSerializer
# from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
# Create your views here.


@api_view(['GET'])
def get_country_by_id(request, id):
    country_by_id = Country.objects.filter(pk=id).first()
    return Response({"data": CountrySerializer(country_by_id).data})


@api_view(['GET'])
def get_country_list(request):
    countries = CountryList.objects.all()
    serializer = CountryListSerializer(countries, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_tour_by_id(request, country_id):
    country_by_id = Country.objects.filter(pk=country_id).first()
    tour = country_by_id.tour.first()
    serializer = TourSerializer(tour, many=False)
    return Response({"data": serializer.data})


class CommentListAPI(APIView):
    def get(self, request, country_id):
        country_by_id = Country.objects.filter(pk=country_id).first()
        comments = country_by_id.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    
    def post(self, request, country_id, format=None):
        country_instance = Country.objects.get(pk=country_id) 
        comment_new = Comment.objects.create(
            text=request.data['text'],
            username=request.data['username'],
            avatar_image='./assets/user-icon-1.png',
            likes=0,
            country=country_instance
        )
        serializer = CommentSerializer(comment_new)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LikeCommentAPI(APIView):
    def get(self, request, id):
        comment_by_id = Comment.objects.filter(pk=id).first()
        if not comment_by_id:
            return Response({"error": "Comment not found"}, 
                            status=status.HTTP_404_NOT_FOUND)
        serializer = CommentSerializer(comment_by_id)
        return Response(serializer.data['likes'])

    def post(self, request, id):
        try:
            comment = Comment.objects.get(pk=id)
            comment.likes += 1
            comment.save()
            serializer = CommentSerializer(comment)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Comment.DoesNotExist:
            return Response({"error": "comment not found"}, 
                            status=status.HTTP_404_NOT_FOUND)
        

class TouristAPI(APIView):
    def get(self, request, tour_id):
        tour_by_id = Tour.objects.filter(pk=tour_id).first()
        tourists = tour_by_id.tourists.all()
        serializer = TouristSerializer(tourists, many=True)
        return Response(serializer.data)
    
    def post(self, request, tour_id, format=None):
        tour_instance = Tour.objects.filter(pk=tour_id).first()
        tourist_new = Tourist.objects.create(
            first_name=request.data['first_name'],
            last_name=request.data['last_name'],
            email=request.data['email'],
            phone_number=request.data['phone_number'],
            option=request.data['option'],
            tour=tour_instance
        )
        serializer = TouristSerializer(tourist_new)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

@api_view(['POST'])
def user_sign_up(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # Set email as the username (so Django's User model stays happy)
    user = User.objects.create_user(username=email, email=email, password=password)

    # Issue JWT tokens right after registration
    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    user = request.user
    return Response({
        'id': user.id,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name
    })


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    if request.method == 'GET':
        return Response({
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name
        })
    elif request.method == 'PUT':
        user.first_name = request.data.get('first_name', user.first_name)
        user.last_name = request.data.get('last_name', user.last_name)
        user.email = request.data.get('email', user.email)
        user.username = request.data.get('email', user.email)
        user.save()
        return Response({'message': 'Profile updated'})