from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import Response
from rest_framework.views import APIView
from rest_framework import status
from api.models import Country, Comment, CountryList, Tour, Tourist
from api.serializers import CountrySerializer, CommentSerializer, CountryListSerializer, TourSerializer, TouristSerializer
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