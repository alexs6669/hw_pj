import graphene
from graphene_django import DjangoObjectType
from authapp.models import User
from pjapp.models import Project, TODO


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class NoteType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_notes = graphene.List(NoteType)

    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    # метод может вернуть список проектов и заметок пользователя
    user_by_username = graphene.List(UserType, username=graphene.String(required=True))

    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))

    note_by_id = graphene.Field(NoteType, id=graphene.Int(required=True))
    note_by_username = graphene.List(NoteType, user=graphene.String(required=True))
    note_by_project = graphene.List(NoteType, project=graphene.Int(required=True))

    @staticmethod
    def resolve_user_by_id(root, info, id):
        return User.objects.get(id=id)

    @staticmethod
    def resolve_user_by_username(root, info, username=None):
        users = User.objects.all()
        if username:
            users = User.objects.filter(username=username)
        return users

    @staticmethod
    def resolve_project_by_id(root, info, id):
        return Project.objects.get(id=id)

    @staticmethod
    def resolve_project_by_name(root, info, name):
        return Project.objects.get(name=name)

    @staticmethod
    def resolve_note_by_username(root, info, user=None):
        notes = TODO.objects.all()
        if user:
            notes = TODO.objects.filter(user__username=user)
        return notes

    @staticmethod
    def resolve_note_by_project(root, info, project):
        notes = TODO.objects.all()
        if project:
            notes = TODO.objects.filter(project=project)
        return notes

    @staticmethod
    def resolve_all_users(root, info):
        return User.objects.all()

    @staticmethod
    def resolve_all_projects(root, info):
        return Project.objects.all()

    @staticmethod
    def resolve_all_notes(root, info):
        return TODO.objects.all()


class NoteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        title = graphene.String(required=False)

    note = graphene.Field(NoteType)

    @classmethod
    def mutate(cls, root, info, id, title):
        note = TODO.objects.get(pk=id)
        note.title = title
        note.save()
        return NoteMutation


class Mutation(graphene.ObjectType):
    update_note = NoteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
