---
layout: default
title: Publications
category_name: Publication
permalink: /category/publication/
---

<div class="category-page">
    <h2 class="category-title">{{ page.title }}</h2>

    <p class="category-description">
        This section features stories and articles that have been published online or in print. Explore my published works here!
    </p>
    <hr />
    <div class="posts-list">
        {% assign category_posts = site.posts | where_exp:"post", "post.categories contains page.category_name" %}

        {% if category_posts.size > 0 %}
        {% for post in category_posts %}
            <div class="archive-post-list-item">
                <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
                <time>
                    {{ post.date | date: "%b %-d, %Y" }}
                    {% if post.word_count %}
                    <span class="index-word-count">
                        • Word Count: <strong>{{ post.word_count }}</strong></span
                    >
                    {% endif %}
                </time>
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
