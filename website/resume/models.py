from django.db import models

class Home(models.Model):
    name = models.CharField(max_length=100)
    summary = models.TextField(max_length=1000)

    def __str__(self):
        return self.name

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