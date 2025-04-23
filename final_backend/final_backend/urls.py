"""
URL configuration for final_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api.views import get_country_by_id, get_country_list, get_tour_by_id, user_sign_up, get_current_user, user_profile
from api.views import CommentListAPI, LikeCommentAPI, TouristAPI
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('datawizard/', include('data_wizard.urls')),
    path('api/country/<int:id>/', get_country_by_id),
    path('api/country/<int:country_id>/comments', CommentListAPI.as_view()),
    path('api/comments/<int:id>/likes/', LikeCommentAPI.as_view()),
    path('api/countrylist', get_country_list),
    path('api/country/<int:country_id>/tour', get_tour_by_id),
    path('api/tour/<int:tour_id>/tourist', TouristAPI.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', user_sign_up),
    path('api/user/', get_current_user, name='get_current_user'),
    path('api/profile/', user_profile),
]
