from django.contrib import admin
from .models import User, Quiz, Question, Response

admin.site.register(User)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Response)
