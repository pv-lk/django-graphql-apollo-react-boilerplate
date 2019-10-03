import graphene
import graphql_jwt

import posts.schema
import users.schema


class Query(posts.schema.Query, users.schema.Query, graphene.ObjectType):
    pass


class Mutation(posts.schema.Mutation, users.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
