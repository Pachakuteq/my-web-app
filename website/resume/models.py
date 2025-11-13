from django.db import models

class Experience(models.Model):
    job_title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    summary = models.TextField()
    start_date = models.CharField(max_length=50)  # e.g., "2021"
    end_date = models.CharField(max_length=50, default="Present")  # e.g., "2023" or "Present"
    order = models.IntegerField(default=0)  # Controls display order (higher = shows first)
    
    class Meta:
        ordering = ['-order']  # Orders by 'order' field, descending
        verbose_name_plural = "Experiences"
    
    def __str__(self):
        return f"{self.job_title} at {self.company}"

class ExperienceHighlight(models.Model):
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE, related_name='highlights')
    text = models.TextField()  # The bullet point text
    order = models.IntegerField(default=0)  # Order of bullet points within the experience
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Experience Highlights"
    
    def __str__(self):
        return f"{self.experience.job_title} - Highlight {self.order}"
    

class Project(models.Model):
    title = models.CharField(max_length=200)
    emoji = models.CharField(max_length=10, default="💻", help_text="Emoji for the project image")
    image = models.ImageField(upload_to='project_images/', blank=True, null=True)  # for future images
    summary = models.TextField()
    order = models.IntegerField(default=0, help_text="Display order (higher = shows first)")
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Projects"
    
    def __str__(self):
        return self.title

class ProjectPoint(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='points')
    text = models.TextField()
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Project Points"
    
    def __str__(self):
        return f"{self.project.title} - Point {self.order}"

class Technology(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='technologies')
    name = models.CharField(max_length=100)
    icon_url = models.URLField(help_text="DevIcon URL from https://devicon.dev")
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Technologies"
    
    def __str__(self):
        return f"{self.project.title} - {self.name}"
    

class Certification(models.Model):
    name = models.CharField(max_length=200)
    short_name = models.CharField(max_length=50, help_text="Short display name (e.g., 'CCNA', 'AWS')")
    image_url = models.URLField(help_text="URL to certification badge image")
    order = models.IntegerField(default=0, help_text="Display order")
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Certifications"
    
    def __str__(self):
        return self.name
    

class CarouselSection(models.Model):
    title = models.CharField(max_length=200, help_text="Section title (e.g., 'Interests', 'Hobbies')")
    order = models.IntegerField(default=0, help_text="Display order")
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Carousel Sections"
    
    def __str__(self):
        return self.title

class CarouselItem(models.Model):
    section = models.ForeignKey(CarouselSection, on_delete=models.CASCADE, related_name='items')
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='carousel_images/', help_text="Background image for the card")
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Carousel Items"
    
    def __str__(self):
        return f"{self.section.title} - {self.title}"