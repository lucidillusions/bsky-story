---
layout: default
title: Short Stories
category_name: ShortStory
permalink: /category/shortstory/
---

<div class="category-page">
    <h2 class="category-title">{{ page.title }}</h2>

  <p class="category-description">
      I've always loved to write, and this space is my way of bringing all my stories, old and new, together in one spot. Many of these tales began as simple ideas that popped into my head, growing into full narratives. Others sparked from unexpected moments of inspiration all around me.
  </p>

  <div class="posts-list">
    {% assign category_posts = site.posts | where_exp:"post", "post.categories contains page.category_name" %}

    {% if category_posts.size > 0 %}
    {% for post in category_posts %}
        <div class="archive-post-list-item">
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            <time>{{ post.date | date: "%b %-d, %Y" }}</time>
            {% if post.excerpt %}
                <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
            {% endif %}
        </div>
      {% endfor %}
    {% else %}
      <p>No posts found in this category yet.</p>
    {% endif %}
  </div>
</div>
