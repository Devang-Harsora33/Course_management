from django.urls import path
from . import views

urlpatterns = [
    path('courses', views.create_course, name='create_course'),
    path('courses', views.list_courses, name='list_courses'),
    path('courses/<str:course_id>', views.view_course, name='view_course'),
    path('courses/<str:course_id>', views.delete_course, name='delete_course'),
    
    path('instances', views.create_instance, name='create_instance'),
    path('instances/<int:year>/<int:semester>', views.list_instances, name='list_instances'),
    path('api/instances/<int:year>/<int:semester>/<int:course_id>', views.view_instance, name='view_instance'),
    path('api/instances/<int:year>/<int:semester>/<int:course_id>/delete', views.delete_instance, name='delete_instance'),]
