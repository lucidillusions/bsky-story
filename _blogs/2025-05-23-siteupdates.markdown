---
layout: blog
title:  "Updates to the Website"
date:   2025-05-23 18:39:03 +0530
updated_on: 2025-06-17 15:30:00 +0530
author: Lucid Illusions
categories: blog
comments: true
bluesky_post_uri: https://bsky.app/profile/lucidillusions.in/post/3lpubhbuvek26
---

I've been using this site to compile my stories for a long time, and for just as long I've been meaning to learn more of Jekyll to add features and fix things. This week I had enough time to just focus on updating the website, and the first thing I did was add the blog section! I kind of like the idea of having a personal space to put brain dump (soemtimes online to keep it in sight for me) - and having a blog used to help, ages back.

So here we are, there's a blog section now, and it's not too bad for starters.

Now on to some of the other things I tinkered on here.

1. When Ryan started publicly sharing updates to bridgy accounts, I felt web-bridge was a cool idea. I was hoping that each story I put up would end up as a new post, and I could then quote and share it. I got the account built, and I updated the handle to look nice, and I just couldn't set up the rss properly to trigger the bridgy accounts post. So this week, I at least managed to get the Mastodon instance to show some of the recent stories. That's some sort of a win I suppose.
- Still need to figure how to make the posts show up on Bsky side of the bridge (I might try and reset the handle to fix it like I had to do for pixelfed)

2. I wanted to figure out how to do webmentions, I find the idea very fascinating. I currently have it functional to some extent, but for now I'll put it under WIP as well.

3. I had a very simple landing page, which was a very long listicle of all the stories I've posted. I sat and updated this to break them based on year, and a toggle setting to see the list. It also has excerpt show up, which I like how it looks. For now I think this is complete, unless I can think of other options.
- I also went ahead and added a category to each story, and when you click on the category it opens a different page with an introduction to the category and list of stories that fall under those.

4. I also wanted to add BlueSky comments to pop up as post comments on the site, and thanks to Franny's [post](https://librarifran.com/posts/2025/02/05/bluesky-comments.html) I could set it up for my site too. Go ahead scroll down, see the replies, and if you're on bluesky leave a comment on the post to see it show up on the blog.

5. Do you remember how we used to have status update during the old internet? I'm so glad Dame brought it back to bsky, and honestly I love that so many users have started an alt that just posts their status. You should check out [this feed](https://bsky.app/profile/did:plc:gq4fo3u6tqzzdkjlwzpb23tj/lists/3loy6eehhef2k), and if you want to read more, check [Dame's blog post about it](https://dame.is/writing/blogs/why-i-started-posting-like-its-the-2000s-again/).
- Another thing I noticed was their status pops up on their website, and I've managed to add that to the landing page as well. (I still need to get the automation work right, so another WIP there)

Anyway, more or less it was a productive week with fixing this website, and have a bunch of other ideas that I want to incorporate here. In the meanwhile, go read some of my recent stories!

### New additions (June 15, 2025)

1. There has been an update on the header, I like how the new one looks and feel.

2. The stories now show Word count and read time.

3. Added an 'Updated on' section for blogs.

<hr />
### Quick Notes for Future Reference. (June 17, 2025)

- GitHub action and PAT.
1. Received an email: We noticed your personal access token (classic) <insert name> with repo and workflow scopes will expire in 7 days.
2. Clicked on the tokens/number/regenerate link in the email.
3. Note on the page "Submitting this form will generate a new token. Be aware that any scripts or applications using this token will need to be updated."
4. Selected 90 days expiration
5. Clicked on Regenerate Token button
6. Found a new token on top (copied it)
7. Went to settings > secrets > actions and pasted the above token to the required secret.
8. Manually run the action.
