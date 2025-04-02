from django.shortcuts import render, redirect
from . import util
import markdown
from django.http import HttpResponse
import os
from django.core.files.storage import default_storage
import random

def index(request):
    query = request.GET.get("q")
    if query:
        return search(request)
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def getPage(request, title):
    content = util.get_entry(title)
    if content is None:
        return HttpResponse("404 Error : Page not found.  The page you are looking for might have been removed or renamed.")
    else:
        html_content = markdown.markdown(content)
    return render(request, "encyclopedia/Title.html", {
        "entries": html_content,
        "title" : title
    })


def search(request):
    entry = request.GET.get("q")
    if not entry:
        return render(request, "encyclopedia/index.html", {
            "entries": util.list_entries()
        })

    content = util.get_entry(entry)
    if content is None:
        entries_dir = default_storage.path("entries")
        files = os.listdir(entries_dir)
        search_matches = [os.path.splitext(f)[0] for f in files if entry.lower() in f.lower()]
        return render(request, "encyclopedia/Search.html", {
            "entries": search_matches,
            "search_query": entry
        })
    else:
        html_content = markdown.markdown(content)
        return render(request, "encyclopedia/Title.html", {
            "title": entry,
            "entries": html_content
        })

def newPage(request):
    if request.method == 'POST':
        title = request.POST.get("title")
        description = request.POST.get("description")
        if util.get_entry(title):
            return render(request, "encyclopedia/CreatePage.html", {
                "error": "An entry with this title already exists.",
                "title": title,
                "description": description
            })
        markdown_content = f"# {title}\n\n{description}"
        util.save_entry(title, markdown_content) 
        return redirect('wiki_page', title=title)
    return render(request, "encyclopedia/CreatePage.html")

def editPage(request, title):
    if request.method == 'POST':
        description = request.POST.get("description")
        content = f"# {title}\n\n{description}"
        util.save_entry(title, content)
        return redirect('wiki_page', title=title)
    
    content = util.get_entry(title)
    if content is None:
        return HttpResponse("404 Error : Page not found. The page you are looking for might have been removed or renamed.")
    
    description = extract_description(content)
    return render(request, "encyclopedia/EditPage.html", {
        "title": title,
        "description": description
    })

def extract_description(content):
    lines = content.split('\n')
    return '\n'.join(lines[1:]).strip()

def extract_title(content):
    lines = content.split('\n')
    title = lines[0].lstrip('# ').strip()
    return title

def randomPage(request):
    entries_dir = default_storage.path("entries")
    files = os.listdir(entries_dir)
    if not files:
        return HttpResponse("No entries found.")
    random_entry = random.randint(0, len(files) - 1)
    entry_filename = files[random_entry].replace('.md', '')
    content = util.get_entry(entry_filename)
    if content is None:
        return HttpResponse("Error: Could not load the content of the random entry.")
    title = extract_title(content)
    html_content = markdown.markdown(content)
    return render(request, "encyclopedia/Title.html", {
        "title": title,
        "entries": html_content
    })