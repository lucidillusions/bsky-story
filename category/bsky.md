---
layout: default
title: BlueSky Prompts
category_name: bsky
permalink: /category/bsky/ # Defines the clean URL for this page
---

<div class="category-page">
    <h2 class="category-title">{{ page.title }}</h2>

  <p class="category-description">
      The stories tagged with Bsky category have originated in one of two ways. Many were written after receiving a writing prompt. In August 2023, I'd asked my mutuals to give me a single word prompt that I could use to write a story for them. Majority of these stories have been compiled into The Forgotten Alley e-book.

      Other times, I'd see an interesting post on the skyline that really inspired me to turn it into a short story, and you have it here!
  </p>

<hr/>
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
