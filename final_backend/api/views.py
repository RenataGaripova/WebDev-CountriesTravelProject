from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import Response
from rest_framework.views import APIView
from rest_framework import status
from api.models import Country, Comment
from api.serializers import CountrySerializer, CommentSerializer
# Create your views here.

@api_view(['GET'])
def get_country_by_id(request, id):
    country_by_id = Country.objects.filter(pk=id).first()
    return Response({"data":CountrySerializer(country_by_id).data})

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
    def post(self, request, id):
        try:
            comment = Comment.objects.get(pk=id)
            comment.likes += 1
            comment.save()
            return Response(comment.data, status=status.HTTP_200_OK)
        except Comment.DoesNotExist:
            return Response({"error": "comment not found"}, status=status.HTTP_404_NOT_FOUND)