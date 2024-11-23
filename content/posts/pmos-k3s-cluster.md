+++
date = '2024-11-22T20:17:14+01:00'
draft = false
title = 'postmarketOS-powered Kubernetes cluster'
thumbnail = '/images/pmos-k3s-cluster.jpg'
tags = ['kubernetes', 'postmarketos', 'k3s', 'homelab', 'linux']
+++

Having a few Raspberry Pi 4s at my disposal, I found myself somewhat dissatisfied with their processing capabilities and power management features.
This led me to explore alternative solutions, particularly given the collection of old smartphones gathering dust in my drawer. T
hese devices, while outdated for daily use, still pack considerable computing power.
In this article, I'll walk through how I transformed these old smartphones into a functional Kubernetes cluster using postmarketOS, giving them a second life as computing nodes.

<!--more-->

<!-- toc -->

## Introduction

Applications nowadays are getting more resource-intensive. Depending on your use case, some of your homelab services might need a lot of processing power and memory.

Some of my (current and future) workloads include:
- CI/CD pipelines
- Photo library software such as [Immich](https://immich.app/)
    - Resizing / converting images
    - Running face recognition
- [Forgejo](https://forgejo.org/) (Git)
- [Woodpecker CI](https://woodpecker-ci.org/)
- [Vaultwarden](https://github.com/dani-garcia/vaultwarden)
- [Plex](https://plex.tv) / [Jellyfin](https://jellyfin.org/)
- [Docmost](https://github.com/docmost/docmost/)
- [Teslamate](https://github.com/teslamate-org/teslamate)
- [Prometheus](https://prometheus.io/)
- [Grafana](https://grafana.com/)
- [LobeChat](https://github.com/lobehub/lobe-chat)
- [Vikunja](https://vikunja.io/) (To-Do list)
- [openvscode-server](https://github.com/gitpod-io/openvscode-server)
- ...


Although it's rare that single services are so demanding, certain pipelines or workflows can be quite resource-intensive. 
The solution is usually to scale horizontally - but this can be expensive (in terms of money, amount of devices, power consumption, physical space).
Buying new devices is not the most sustainable solution, especially when you're surrounded by old devices that have a computing power that is comparable or even better than that of your next purchase.

## What are Raspberry Pis good for?

Raspberry Pis excel at running small services and functioning as [appliances](https://gokrazy.org/). Their GPIO capabilities make them perfect for physical computing projects, but as Kubernetes nodes, they have some limitations.

Here are the main challenges I've encountered:
- Physical size: With a case, they're relatively bulky for a computing node
- Power management: One power supply per device is often needed
- Power stability: Multi-port power supplies can be unreliable, causing simultaneous outages across nodes
- Performance: Limited computing power compared to modern mobile processors
- Price: [A Raspberry Pi 5 with 8 GB of RAM](https://www.digitec.ch/en/s1/product/raspberry-pi-new-raspberry-pi-5-8gb-development-boards-kits-38955607) costs around [85 CHF](https://www.xe.com/currencyconverter/convert/?Amount=85&From=CHF&To=USD): there are cheaper and more sustainable solutions

While I have used several Raspberry Pis for other projects (like my wedding photobooth, which I'll detail in another post), their I/O capabilities are often underutilized when serving purely as compute nodes.


## What's so compelling about old smartphones?

On one hand, a Raspberry Pi 4 is a great device for running small services and provides
a very good interface between hardware and software. On the other hand, old smartphones are often discarded due to their outdated software, but they still have a lot of computing power and memory.

Old devices are filling marketplaces and drawers. For a very low price, usually 0 if the device sits in your drawer, you can get a device with an octa-core CPU, 6/8 GB of RAM and 128+ GB of storage.
If you compare this with a Raspberry Pi 4, using an old smarthphone as a computing node could be a good idea.

### Comparison

Here is a small comparison of some of the devices I have at my disposal:

| Device | Year | Cores | Frequencies | RAM | Storage | Storage Type |
|:-------|-----:|----------:|------------:|----:|--------:|--------------|
| [Xiaomi Redmi Note 11 Pro](https://www.gsmarena.com/xiaomi_redmi_note_11_pro_5g-11333.php) | 2022 | 8 | 2x2.2 GHz, 6x1.7 GHz | 4/6/8GB | 64/128GB | UFS 2.2 |
| [Oneplus Nord](https://www.gsmarena.com/oneplus_nord-10289.php) | 2020 | 8 | 1x2.4 GHz, 1x2.2 GHz, 6x1.8 GHz | 6/8/12 GB | 64-256 GB | UFS 2.1 |
| [OnePlus 8 Pro](<https://wiki.postmarketos.org/wiki/OnePlus_8_Pro_(oneplus-instantnoodlep)>) | 2020 | 8 | 1x2.84 GHz, 3x2.42GHz, 4x1.8 GHz | 8/12 GB  | 128/256 GB | UFS 3.0 |
| [Raspberry Pi 4](https://en.wikipedia.org/wiki/Raspberry_Pi_4) | 2019 | 4 | 1.5 GHz| 2-8 GB | External | microSD |
| [OnePlus 5T](<https://wiki.postmarketos.org/wiki/OnePlus_5T_(oneplus-dumpling)>) | 2017 | 8 | 4x 2.45 GHz, 4x1.9 GHz| 6/8 GB | 64/128 GB | UFS 2.1 |


There's also inherent value in using smartphones: they come with built-in batteries that function as UPS (Uninterruptible Power Supply) units, and their integrated displays can serve as dashboard monitors. These features provide additional utility without requiring extra hardware components. You can of course turn off the backlight of the display to save power if you don't need it.


## What's bad about Linux on smartphones?

### No support for mainline Linux

Most of the Android smartphones out there have poor support for _mainline_ Linux. The kernel running on the average Android device is generally a heavy customized
version of the Linux kernel. This makes things complicated, and reduces security and performance.  
  
While this is not a problem of the smartphones per se, it's going to be a problem if you intend to use them as Kubernetes nodes, or use them for anything else that's not Android.  

### Unlocking the bootloader can be... tricky

Not all the devices can be unlocked easily. While some manufacturers allow you to `fastboot oem unlock` your device directly, others require you to perform long processes to unlock the bootloader, and sometimes you can't unlock it at all.  
  
If you're about to buy an used device for this purpose, make sure the brand is known for allowing bootloader unlocking.  
  
To save you some time, try to generally avoid:
- Xiaomi
    - Unlocking the bootloader takes from 7 to 30 days to unlock
    - During this time, you need to keep the same Xiaomi account connected to the device,
    - You'll have to use a Xiaomi-provided application... but [there are alternatives](https://github.com/topminipie/awesome-xiaomi-bootloader-unlock)
- Huawei / Honor
    - You can't unlock the bootloader anymore

... and prefer:

- Google
- OnePlus
- FairPhone

See a complete list on [Bootloader Unlock Wall Of Shame](https://github.com/melontini/bootloader-unlock-wall-of-shame).


### GPL is not always respected

The Linux kernel is licensed under the GPL, which means that if you modify it, you have to share your modifications.  
Despite this, many manufacturers are slow to release the kernel sources, or don't release them at all.

One example of this is [Xiaomi](https://github.com/MiCode/Xiaomi_Kernel_OpenSource/issues) ([HN discussion](https://news.ycombinator.com/item?id=35184859)), 
which has been criticized for not releasing the kernel sources for some of their devices.

### Your device is not supported

This is not really a problem caused by anyone really, there will always be a device that is not supported by the community - and sometimes _you_ will be the one
that has to put in the legwork to make it work.  
  

I'm by no means a kernel expert, but I've tried this road [a couple](https://github.com/pixelc-linux/documentation) [of times](https://github.com/linux-surface/surface-pro-x/issues?q=author%3Adenysvitali) - and, while it might be challenging, it's a very rewarding process and you get to learn a lot about how these devices work. 
In the next sections you'll see what I mean by this.  
  
Despite this, you can still play it safe and buy an used device that is already (partially) [supported by the community](https://wiki.postmarketos.org/wiki/Devices).  
  
Before you complain about the lack of support for your device: make sure to also check the "Testing" section of the [postmarketOS Devices](https://wiki.postmarketos.org/wiki/Devices) page:
it's easy to miss that part and might sound scary, but a "testing" device is generally just a device that doesn't have full support for all the features and that doesn't have a ready to use firmware image. With [`pmbootstrap`](https://docs.postmarketos.org/pmbootstrap/usage.html) setting up an already upstremed testing device is really a breeze!

## What is postmarketOS?

Okay, we mentioned it a couple of times already, but I didn't explain what the heck [postmarketOS](https://postmarketos.org/) is.  
The shortest way to describe it is: it's a rolling Linux distribution for smartphones based on [Alpine Linux](https://alpinelinux.org/).  
  
The interesting part of this distribution is that _it's meant to be run together with the mainline Linux kernel_. This is not just another Android ROM: it is the key to the long-term support of the devices.
  
Whilst I haven't seen anyone (yet) really using pmOS as a daily driver, and I myself am not doing that either (I'm using [GrapheneOS](https://grapheneos.org/)).  
  
Being a Linux distribution based on Alpine, you can really use your smartphone as if it's a computer (or in my case, a server): this means that you can install for example [sway](https://swaywm.org/), [KDE](https://kde.org/) or literally any other desktop environment you want and run your favorite applications.  

## State of Linux on ARM
  
With the recent Apple Silicon push and the amazing work of [aarch64-laptops](https://github.com/aarch64-laptops) / [Linaro](https://www.linaro.org/) ([thanks](https://old.linaro.org/blog/porting-linux-to-aarch64-laptops/) Bjorn & team!), Linux on ARM is growing fast and it's supported by many distros / forks (such as [Arch Linux ARM](https://archlinuxarm.org/), [Alpine Linux](https://wiki.alpinelinux.org/wiki/Alpine_on_ARM), [Debian](https://wiki.debian.org/Arm64Port#Official_Debian_port), ...) - so using a smartphone as a server / computer is not that crazy anymore as mobile devices aren't that different from (new) laptops anymore.  
  
There are still a few assumptions made by some software distributors (especially Docker Images) where they assume that you're running on `x86_64`, but this is getting better and better, especially given the "recent" additions of [multi-platform builds](https://docs.docker.com/build/building/multi-platform/) on Docker.


## Setting up a node

### Lessons learned

Before I start with the details, I want to immediately share some lessons learned - so that you can avoid some of the mistakes I made:

- **Don't spend half a day debugging `iptables`**: postmarketOS comes with `nftables` and the default rules in `/etc/nftables.nft` are the reason why your Kubernetes network might get messed up

- Docker, Kubernetes and K3s require some kernel modules / configs to be enabled:
    - Try to run a Docker container first, and eventually use [moby's `check-config.sh`](https://github.com/moby/moby/blob/master/contrib/check-config.sh)

    - Use [k3s's `check-config.sh`](https://github.com/k3s-io/k3s/blob/master/contrib/util/check-config.sh) to check if your kernel is ready. In my case ([`dumpling`](https://wiki.postmarketos.org/wiki/OnePlus_5T_(oneplus-dumpling)) was missing some kernel configs, but [`instantnoodlep`](https://wiki.postmarketos.org/wiki/OnePlus_8_Pro_(oneplus-instantnoodlep)) was fine)

    - Kubernetes doesn't come with a `check-config.sh` file - but your Container Network Interface (CNI) might require some kernel features that Docker / K3s don't need. In the case of Flannel, make sure you have most / all the `CONFIG_NETFILTER_XTABLES` options enabled in your kernel, as well as `CONFIG_VXLAN`.

### OnePlus 5T (dumpling)


