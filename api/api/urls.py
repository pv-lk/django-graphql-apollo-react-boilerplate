from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from django.conf.urls import url
# from django.views.generic import RedirectView
from graphene_django.views import GraphQLView
from graphql_jwt.decorators import jwt_cookie
from . import views

from .schema import schema

admin.autodiscover()

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    #url(r'^graphql', csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
    path('csrf/', views.csrf),
    path('ping/', views.ping)
    path('graphql/', jwt_cookie(GraphQLView.as_view(graphiql=True, schema=schema)))
]
