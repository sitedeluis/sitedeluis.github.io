---
layout: default
title: Archivos
---

# Archivo

📚 Aquí están todas las publicaciones por fecha y año.

{% assign months = "Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre" | split: "|" %}
{% assign postsByYearMonth = site.posts | group_by_exp: "post", "post.date | date: '%m %Y'" %}

{% for yearMonth in postsByYearMonth %}
  {% assign dateParts = yearMonth.name | split: " " %}
  {% assign monthNumber = dateParts[0] | plus: 0 | minus: 1 %}
  {% assign year = dateParts[1] %}
  <h2>{{months[monthNumber]}} {{year}}</h2>
  <ul>
    {% for post in yearMonth.items %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <small>{% include date-es.html date=post.date %}</small>
      </li>
    {% endfor %}
  </ul>
{% endfor %}
