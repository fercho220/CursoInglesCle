# from django.core.exceptions import ValidationError
import os
from django.forms import ValidationError

def valid_extension(value):
    if (not value.name.endswith('.png') and
        not value.name.endswith('.jpeg') and 
        not value.name.endswith('.pdf') and
        not value.name.endswith('.jpg')):
        
        raise ValidationError("Archivos permitidos: .jpg, .jpeg, .png, .pdf")
    
class extension:
    def __init__(self, content_type = '.pdf'):
        self.content_type = content_type

    def __call__(self,value):
        exte = value.content_type
        if exte != self.content_type:
            raise ValidationError("Archivos permitidos: .jpg, .jpeg, .png, .pdf, .bmp")
        return value

def validate_extension(file):
    valid_mime_types = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
    file_mime_type = magic.from_buffer(file.read(2048), mime=True) #  Changed this to 1024 to 2048

    if file_mime_type not in valid_mime_types:
        raise ValidationError("Unsupported file type.")

    valid_file_extensions = [".pdf", ".jpeg", ".png", ".jpg"]
    ext = os.path.splitext(file.name)[1]

    if ext.lower() not in valid_file_extensions:
        raise ValidationError("Unacceptable file extension.")

def validate_file_extension(value):
    import os
    from django.core.exceptions import ValidationError
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.png', '.xlsx', '.xls']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')