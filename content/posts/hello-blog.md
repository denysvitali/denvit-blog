---
title: "Hello Blog!"
date: 2018-03-04T13:49:05+01:00
categories: ["Blog", "Tech"]
---

Well, I finally found the time time to ditch my old WordPress blog and replace it with this shiny-new
static blog generated with [Hugo](https://gohugo.io/).  
I personally chose not to use any of the [kick-ass themes](https://themes.gohugo.io/) available, but I decided to port my [TheBestMotherfucking.website](https://thebestmotherfucking.website/) [theme](https://github.com/denysvitali/thebestmotherfuckingwebsite) to
Hugo instead. I obviously found a good name for it: [The Best Motherfucking Blog Theme](https://github.com/denysvitali/hugo-thebestmotherfuckingblog).  
<!--more-->

## Improvements  
  
Thanks to the switch from Wordpress to Hugo, there have been a lot of improvements, namely:  
  
- I can now write my blog posts in Markdown (huge improvement!)  
- The website is now static, can be cached and has little to no impact on the server resources  
- The pages are minimal, only the necessary content is loaded  
- There is no risk of hacking, since there is no backend  
- I can update the website with a git push  
- Anybody can [contribute to the blog](https://github.com/denysvitali/denvit-blog) or [the theme](https://github.com/denysvitali/hugo-thebestmotherfuckingblog)  
- I can now write footnotes [^1] with ease!    
  
It is still a work in progress though, but it seems to be quite minimal and functional.  
![The blog, now](/blog/2018/03/hello-blog-1.jpg)

### Code Highlighting
What I find pretty handy about hugo is that the code can be automatically highlighted,
for example, if I wanted to add a CSS snippet here is how it would appear:
{{< highlight css >}}
a.site-title, a.site-title:visited{
  color: @titleColor;
  text-decoration: none;
}

img{
  max-width: 100%;
}
{{< /highlight >}}

Pretty nice huh?

[^1]: Example of a footnote