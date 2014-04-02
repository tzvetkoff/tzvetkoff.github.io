---
layout: post
title: Installing Adobe CS6 on case-sensitive drives (Mac OS X)
---

Well, everybody knows that Adobe are a shitty company.
Their products are the defacto standard for image/video editing and designing, but their codebase really suck. No excuses.

The problem addressed here is that Creative Studio™ refuses to install on a case-sensitive drives on Mac OS X.
And it doesn't just refuse to install on a case-sensitive drive, but it also requires to install on your *boot* drive as well! Srsly?

Well, there's a solution. I've just stumbled upon [this](https://bitbucket.org/lokkju/adobe_case_sensitive_volumes), and I'm really anxious to share it.
I've forked the code to update it for CS6.

## Prerequisites

1.  `Xcode`.
    You can install it from the [AppStore](https://itunes.apple.com/app/xcode/id497799835).
2.  Command Line Tools for Xcode.
    You can install it from Xcode's `Preferences` -> `Downloads`.

## A step-by-step installation instructions

<ol>
  <li>
Create a <code>.sparsebundle</code> pseudo-image to install CS6:

{% highlight bash %}
mkdir -p ~/Stuff/Adobe
cd ~/Stuff/Adobe
hdiutil create -size 15g -type SPARSEBUNDLE -nospotlight -volname 'Adobe CS6 SparseBundle' -fs 'Journaled HFS+' ~/Stuff/Adobe/Adobe_CS6_SparseBundle.sparsebundle
{% endhighlight %}
  </li>
  <li>
Mount the newly created image and create a <code>/Adobe</code> directory inside

{% highlight bash %}
open ~/Stuff/Adobe/Adobe_CS6_SparseBundle.sparsebundle
mkdir -p /Volumes/Adobe\ CS6\ SparseBundle/Adobe
{% endhighlight %}
  </li>
  <li>
Create an extra <code>/Applications/Adobe</code> folder on the boot drive (we will trick the installer with this temporary directory)

{% highlight bash %}
mkdir -p /Applications/Adobe
{% endhighlight %}
  </li>
  <li>
Get the hack, compile it, and run it<br /><br />
OK, at this point you'll need to edit the <code>Makefile</code> and set the <code>CS6_INSTALLER_PATH</code> variable to point to the <code>Install.app</code> directory<br />
The current one tries to find it automatically, but it <em>may</em> fail...

{% highlight bash %}
cd ~/Stuff/Adobe
git clone git://github.com/tzvetkoff/adobe_case_sensitive_volumes.git
cd adobe_case_sensitive_volumes
make
sudo make run
{% endhighlight %}
  </li>
  <li>
When asked, select <code>/Applications/Adobe</code> for installation directory rather than just <code>/Applications</code>, but <strong>don't</strong> click the <code>Install</code> button!!<br />
Remember, <strong>don't</strong> click the <code>Install</code> button just yet
  </li>
  <li>
Now, time to do one more hack - remove the <code>/Applications/Adobe</code> directory and replace it with a symlink to the <code>/Adobe</code> directory from the SparseBundle.

{% highlight bash %}
rm -rf /Applications/Adobe
ln -s /Volumes/Adobe\ CS6\ SparseBundle/Adobe/ /Applications/Adobe
{% endhighlight %}
  </li>
  <li>
Now click the <code>Install</code> button
  </li>
  <li>
You can now safely delete the intermediate files and probably move the SparseBundle somewhere easier to mount by just clicking it (the Desktop, probably?)

{% highlight bash %}
mv ~/Stuff/Adobe/Adobe_CS6_SparseBundle.sparsebundle ~/Desktop/Adobe_CS6_SparseBundle.sparsebundle
rm -rf ~/Stuff/Adobe
{% endhighlight %}
  </li>
  <li>
That's it!
  </li>
</ol>
<br />
Just remember that you'll need to mount the SparseBundle every time you need to use Adobe's products...

## Update @ 2014-04-01

You can also run the updater (`Adobe Application Manager`), with a slightly different command:
{% highlight bash %}
sudo make run CS6_INSTALLER_PATH='"/Applications/Utilities/Adobe Application Manager/core/Adobe Application Manager.app/Contents/MacOS/PDApp"'
{% endhighlight %}
Note the double quoting!

## Thanks

* [lokkju](https://bitbucket.org/lokkju), for writing [that awesome article and code](https://bitbucket.org/lokkju/adobe_case_sensitive_volumes) to start from
