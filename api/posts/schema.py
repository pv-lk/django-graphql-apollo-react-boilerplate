import graphene
from graphene_django import DjangoObjectType

from .models import Post

class Query(graphene.ObjectType):
    posts = graphene.List(PostType)

    def resolve_posts(self, info, **kwargs):
        return Posts.objects.all()


class CreatePost(graphene.Mutation):
    # post = graphene.Field(PostType)
    id = graphene.Int(required=True)
    text = graphene.String()
    # author = graphene.

    class Arguments:
        text = graphene.String()

    def mutate(self, info, text):
        post = Post(
            text = text
        )
        post.save()

        return CreatePost(
            text = text
        )

class Mutation(graphene.ObjectType):
    create_post = CreatePost.Field()
