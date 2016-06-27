from locust import HttpLocust, TaskSet

def index(l):
    l.client.get('/');

def native(l):
    l.client.get("/functionalnative")

def asyncreq(l):
    l.client.get("/functionalasync")

def ramda(l):
    l.client.get("/functionalramda")

def raw(l):
    l.client.get("/rawdata")

class UserBehavior(TaskSet):
    tasks = {ramda:1, index: 2}

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait=5000
    max_wait=9000
