import React, { useEffect, useState } from "react";

const Quotes = [
  {
    quote:
      "No, I like to rock n' roll all night and *part* of every day. I usually have errands... I can only rock from like 1-3.",
    movie: "Role Models (2008)",
  },
  {
    quote:
      "Two things: You keep your liver-spotted hands off my beautiful mother. She's a saint! And then you sit down and you write Dale and Brennan a check for $10,000.",
    movie: "Step Brothers (2008)",
  },
  {
    quote:
      "I live in a swamp! I put up signs! I'm a terrifying ogre! What do I have to do to get a little privacy?",
    movie: "Shrek (2001)",
  },
  {
    quote:
      "Well, you're two penises short of a Shania Twain reimagination band!",
    movie: "Nick and Norah's Infinite Playlist (2008)",
  },
  {
    quote:
      "So maybe I don't know what the Civil War was, or who invented the helicopter even though I own one, but I did beat The Legend of Zelda before I could walk.",
    movie: "Grandma's Boy (2006)",
  },
  {
    quote:
      "You want to talk about mothers? You wanna talk about mothers! It's mother time, OK?",
    movie: "White Chicks (2004)",
  },
  {
    quote:
      "I just don't see how having somebody piss on my face is going to help me sell Lou Ferrigno's house.",
    movie: "I Love You, Man (2009)",
  },
  {
    quote:
      "Benjamin is nobody's friend. If Benjamin were an ice cream flavor, he'd be pralines and dick.",
    movie: "Wayne's World (1992)",
  },
  {
    quote: "I'm glad he's single because I'm going to climb that like a tree.",
    movie: "Bridesmaids (2011)",
  },
  {
    quote:
      "My childhood was typical. Summers in Rangoon... luge lessons. In the spring, we'd make meat helmets.",
    movie: "Austin Powers: International Man of Mystery (1997)",
  },
  {
    quote: "It's the weekend, Budnick. I don't know you. You do not exist.",
    movie: "The Hangover (2009)",
  },
  {
    quote:
      "Oh, this is your wife? A lovely lady. Hey, baby, you're alright. You must've been something before electricity.",
    movie: "Caddyshack (1980)",
  },
  {
    quote:
      "They're pretty good, except for one little problem. That little guy right there. He is nipple number five.",
    movie: "Napoleon Dynamite (2004)",
  },
  {
    quote: "You are a human affront to all women, and I am a woman.",
    movie: "When Harry Met Sally... (1989)",
  },
  {
    quote: "I wouldn't let you sleep in my room if you were growing on my ass.",
    movie: "Home Alone (1990)",
  },
  {
    quote:
      "What you've just said is one of the most insanely idiotic things I have ever heard.",
    movie: "Billy Madison (1995)",
  },
  {
    quote: "If you can dodge a wrench, you can dodge a ball.",
    movie: "Dodgeball: A True Underdog Story (2004)",
  },
  {
    quote: "It’s pronounced 'Fronkensteen.'",
    movie: "Young Frankenstein (1974)",
  },
  {
    quote:
      "I like to picture Jesus in a tuxedo T-shirt because it says I want to be formal, but I'm here to party.",
    movie: "Talladega Nights (2006)",
  },
  {
    quote:
      "Last night you were unhinged. You were like some desperate, howling demon. You frightened me. Do it again.",
    movie: "The Addams Family (1991)",
  },
  {
    quote: "Looks like I picked the wrong week to quit sniffing glue.",
    movie: "Airplane! (1980)",
  },
  {
    quote: "Your mother was a hamster and your father smelt of elderberries.",
    movie: "Monty Python and the Holy Grail (1975)",
  },
  {
    quote:
      "She thinks I'm a fascist? I don't control the railways or the flow of commerce!",
    movie: "Barbie (2023)",
  },
  {
    quote: "When life gives you lemons, just say ‘fuck the lemons’, and bail.",
    movie: "Forgetting Sarah Marshall (2008)",
  },
  {
    quote:
      "I don’t want to be rude, but may I have a drink? I had three or four before I got here, but they’re beginning to wear off.",
    movie: "The Awful Truth (1937)",
  },
  {
    quote: "Gentlemen, you can't fight in here. This is the war room!",
    movie: "Dr. Strangelove (1964)",
  },
  {
    quote:
      "Did you just look at me? Did you? Look at me! Look at me! How dare you? Close your eyes!",
    movie: "The Favourite (2018)",
  },
  {
    quote: "Is that your gun in your pocket or are you just glad to see me?",
    movie: "Sextette (1977)",
  },
  { quote: "That is mahogany!", movie: "The Hunger Games (2012)" },
  { quote: "You're a virgin who can't drive.", movie: "Clueless (1995)" },
  { quote: "Leave the gun. Take the cannoli.", movie: "The Godfather (1972)" },
  {
    quote: "If I'm not back in five minutes, just wait longer.",
    movie: "Ace Ventura: Pet Detective (1994)",
  },
  {
    quote:
      "If we get any more white people in here, this is gonna be a suburb.",
    movie: "Hairspray (2007)",
  },
  { quote: "Snap out of it!", movie: "Moonstruck (1987)" },
  {
    quote:
      "I have had it with these motherfucking snakes on this motherfucking plane!",
    movie: "Snakes on a Plane (2006)",
  },
  { quote: "Bye, Felicia.", movie: "Friday (1995)" },
  { quote: "You sit on a throne of lies.", movie: "Elf (2003)" },
  {
    quote: "Even if I wanted to go, my schedule wouldn't allow it.",
    movie: "How the Grinch Stole Christmas (2000)",
  },
  { quote: "She doesn't even go here!", movie: "Mean Girls (2004)" },
  {
    quote: "That rug really tied the room together, did it not?",
    movie: "The Big Lebowski (1998)",
  },
  {
    quote: "You're dizzy because you played Russian roulette with your vagina.",
    movie: "Obvious Child (2014)",
  },
  {
    quote: "You are a sad, strange little man, and you have my pity.",
    movie: "Toy Story (1995)",
  },
  {
    quote:
      "My father would womanize. He would drink. He would make outrageous claims like he invented the question mark.",
    movie: "Austin Powers (1997)",
  },
  { quote: "YOU'RE AN INANIMATE FUCKING OBJECT!", movie: "In Bruges (2008)" },
  { quote: "He's so fluffy, I'm gonna die!", movie: "Despicable Me (2010)" },
];

const backdrops = [
  "https://image.tmdb.org/t/p/original/88nIQnyDyYfEpR7s9hwbfhJuxK9.jpg",
  //   "https://image.tmdb.org/t/p/original/txHiVwtNn4QjlEKQ7wVfFbnI8no.jpg",
  "https://image.tmdb.org/t/p/original/rTOLPumsQpUTGPFFonBzPv7JF1y.jpg",
  "https://image.tmdb.org/t/p/original/tG8QWDASd8rw0JxkDN2MDDWLEse.jpg",
  "https://image.tmdb.org/t/p/original/oZzFRRzuQS0FmSWSbwEvdAkcRBh.jpg",
  "https://image.tmdb.org/t/p/original/1AZqsVUJFBj2phRh9tJvpXDaG4E.jpg",
  "https://image.tmdb.org/t/p/original/1C26hSKJnNAlfimNGFJ30l612cJ.jpg",
];

const LoadingPage = ({ onLoadComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuote] = useState(() =>
    Math.floor(Math.random() * Quotes.length)
  );
  const [currentBackdrop] = useState(() =>
    Math.floor(Math.random() * backdrops.length)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadComplete) {
        onLoadComplete();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backdrops[currentBackdrop]})`,
      }}>
      <div className="card w-96">
        <div className="card-body items-center text-center">
          {/* Quote Section */}
          <div className="space-y-4">
            <p className="text-lg font-serif italic animate-fade-in">
              "{Quotes[currentQuote].quote}"
            </p>
            <p className="text-sm text-base-content/70">
              — {Quotes[currentQuote].movie}
            </p>
          </div>

          {/* Loading Dots */}
          <div className="flex gap-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-primary animate-bounce"
                style={{
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
