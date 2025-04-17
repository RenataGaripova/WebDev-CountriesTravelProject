from rest_framework import serializers
from api.models import Country, Comment

class CountrySerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    images = serializers.CharField(max_length=255)
    map = serializers.CharField(max_length=255)
    history = serializers.CharField()
    geography = serializers.CharField()
    holidays = serializers.CharField()
    travel = serializers.CharField()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["text", "username", "avatar_image", "likes", "country"]