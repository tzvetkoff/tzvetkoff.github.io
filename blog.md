---
title: Blog
layout: page
---

A more or less chronological list of blog posts:

<ul class="posts">
{% for post in site.posts %}
  <li><time>{{ post.date | date_to_string }}</time> &raquo;&nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>
