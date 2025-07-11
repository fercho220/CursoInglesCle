from django.shortcuts import redirect

class LoginYSuperUsuarioMixin(object):

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            if request.user.is_staff:
                return super().dispatch(request, *args, **kwargs)
        return redirect('curso:index')

class LoginYFacilitador(object):
    def dispatch(self, request, *args, **kwargs):
        user1 = request.user
        user_groups = user1.groups.values_list("name", flat=True)
        if request.user.is_authenticated:
            if 'Facilitadores' in user_groups:
                return super().dispatch(request, *args, **kwargs)
        return redirect('curso:index')