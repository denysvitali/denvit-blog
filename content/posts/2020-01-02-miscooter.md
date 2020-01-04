---
title: "Making the Mi Electric Scooter Pro street-legal in Switzerland"
date: 2020-01-02T21:25:38+01:00
categories: ["Tech", "E-Scooter", "Scooter", "Xiaomi"]
---

A couple of weeks ago I started looking for an e-scooter to ease my girlfriend's commute and (in the future) to ease mine aswell. 
After a quick scouting on the most famous electronics store website of
Switzerland, I found the perfect one: the _Mi Electric Scooter Pro_.  
   
Unfortunately this e-scooter out of the box not street-legal based on the Swiss law (VTS[^1]) because of its top speed of 25 km/h. Here is how I made
it street-legal.
<!--more-->

## Definition of the vehicle type

{{< warning >}}
I'm not a lawyer. My conclusions may be wrong.  
If you want to point out a mistake, contact me and I'll reflect the changes ASAP. I don't want to spread false information.
{{< /warning >}}

[Article 18 of the VTS](https://www.admin.ch/opc/it/classified-compilation/19950165/index.html#a18) states that (translated, emphasis is mine): 



> ### Motorcycles are:
> (...)  
>
> b. **"Light motorcycles"**, i.e. electrically powered vehicles with a total engine power not exceeding 0,50 kW, a maximum design speed not exceeding 20 km/h and, if fitted, pedal assistance not exceeding 25 km/h, and which:  
>   
>  - have a maximum of two seats,  
>  - are specially adapted for the carriage of a disabled person,  
>  - consist of a special bicycle-wheelchair combination, or  
>  - are specially designed to carry a maximum of two children in protected seating positions;     
>
>  c. **"electric standing scooters"**, i.e. single-seat, **_self-balancing_** vehicles with electric drive and: an engine power not exceeding 2.00 kW in total, which is used to a significant extent to maintain the balance of the vehicle,  
>    
>    1. an engine power not exceeding 2.00 kW in total, which is used to a significant extent to maintain the balance of the vehicle,  
>    2. a maximum design speed not exceeding 20 km/h, and  
>    3. Any pedal assistance that is effective up to a maximum speed of 25 km/h   
>
>  (...)


#### Legal Vehicle Definition  
So... what's the legal definition of an e-scooter like the Xiaomi Mi Scooter Pro? Well, according to the swiss law, it is denominated "Light Motorcycle" because:
  
- This electric scooter doesn't have any kind of self-balancing mechanism, and  
- it doesn't have any pedal assistance, which is required to be classified as an _electric standing scooter_
  
## Legal requirements

Now, the biggest question is: what makes the Mi Scooter Pro
street-illegal in Switzerland, and what can be done to make it
street legal?  


### Legal requirements for a "Light Motorcycle"

We'll use [this handy cheatsheet](https://www.astra.admin.ch/dam/astra/de/dokumente/fahrzeuge/merkblaetter/zusammenstellung-elektro-fahrzeuge.pdf) (in German, also available in [French](https://www.astra.admin.ch/dam/astra/fr/dokumente/fahrzeuge/merkblaetter/zusammenstellung-elektro-fahrzeuge.pdf) and [Italian](https://www.astra.admin.ch/dam/astra/it/dokumente/fahrzeuge/merkblaetter/zusammenstellung-elektro-fahrzeuge.pdf))  provided by [ASTRA](https://astra.admin.ch/), which is the Federal Roads Office of Switzerland [^2]. This cheatsheet, updated on February 2019,
shows the kind of characteristics that are needed in order
to be street-legal.  

<table style="width: 100%">
<tr class="table-header">
    <th width="33%">Characteristic</th>
    <th width="33%">Legal Requirement</th>
    <th width="33%">Xiaomi Mi Scooter Pro</th>
</tr>

<tr>
    <td>Total drive power<br/><small>Art. 18 Bst. b VTS</small></td>
    <td>500W maximum</td>
    <td>300 W</td>
</tr>

<tr>
    <td>Max speed <br/><small>Art. 18 Bst. b VTS</small></td>
    <td>20 km/h</td>
    <td style="color: #f44336">Approx. 25km/h<br>
    <ul>
        <li>ECO: 15km/h;</li>
        <li>D: 20km/h;</li>
        <li>S: 25km/h</li>
    </ul>
    </td>
</tr>

<tr>
    <td>Max speed w/ pedal assistance<br/><small>(Art. 18 Bst. b VTS)</small></td>
    <td>25 km/h</td>
    <td><i>NO PEDAL ASSISTANCE</i></td>
</tr>

<tr>
    <td>Total weight<br/><small>Art. 175 Abs. 4 VTS</small></td>
    <td>Max 200 kg</td>
    <td>14.2 kg</td>
</tr>

<tr>
    <td>Acoustic Warning device<br/><small>Art. 178b Abs. 1 VTS</small></td>
    <td>Required, only bell permitted</td>
    <td>Bell</td>
</tr>

<tr>
    <td>Parking support</td>
    <td>Optional</td>
    <td>Available</td>
</tr>

<tr>
    <td>Brakes <br/><small>Art. 178 Abs. 3 und 4 VTS, Art. 177 Abs. 6 VTS</small></td>
    <td>2, on the same track but on separate wheels (at least 1 of them as friction brake). <br/>
    <br/>
    The brakes must be usable at any time and under any operating conditions, e.g. in the case of brakes
electric even with a full or low battery.</td>
    <td>Front Electrical braking and Rear physical braking</td>
</tr>

<tr>
    <td>Rearview Mirror <br/></td>
    <td>Optional</td>
    <td>None</td>
</tr>

<tr>
    <td>Turn signal</td>
    <td>Allowed, homologated<br/><small>Art. 180 VTS</small>
    <br/>
    <br/>
    Front: The gap between the illuminated surfaces must be at least 0.24 m. <br/>
    Rear: The gap between the illuminated surfaces must be at least 0.18 m. <br/>
    <small>Anh. 10 Ziff. 24 und 52 VTS</small>
    </td>
    <td>None</td>
</tr>
</table>

#### Registration Examination

> Mopeds shall not require a registration examination as referred to in Articles 30-32. For such vehicles the registration procedure shall be based on Articles 90-96 CAO

We don't need to register for an examination. Therefore, any modification
that we make doesn't require the authority to examine it.  
  
## Making the e-scooter street legal
{{< information >}}
This part of the article requires some IT and electronics knowledge. 
{{< /information >}}

#### Lighting

[^1]: Verordnung über die technischen Anforderungen an Strassenfahrzeuge
[^2]: Bundesamt für Strassen