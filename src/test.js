export function calculateSimilarity(text1, text2) {
  const maxLength = Math.max(text1.length, text2.length);
  const distance = levenshteinDistance(text1, text2);
  return 1 - distance / maxLength;
}

function levenshteinDistance(str1, str2) {
  const matrix = [];

  // Initialize the matrix with the length of the strings
  for (let i = 0; i <= str1.length; i++) {
      matrix[i] = [i];
  }

  for (let j = 0; j <= str2.length; j++) {
      matrix[0][j] = j;
  }

  // Fill in the matrix
  for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
          const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
          matrix[i][j] = Math.min(
              matrix[i - 1][j] + 1, // Deletion
              matrix[i][j - 1] + 1, // Insertion
              matrix[i - 1][j - 1] + cost // Substitution
          );
      }
  }

  // Return the Levenshtein distance
  return matrix[str1.length][str2.length];
}


export function findBestMatch(fullLyrics, recognitionText) {
  let bestMatch = { similarity: 0, startIndex: 0 };

  for (let i = 0; i <= fullLyrics.length - recognitionText.length; i++) {
      const portion = fullLyrics.substring(i, i + recognitionText.length);
      const similarity = calculateSimilarity(portion, recognitionText);

      if (similarity > bestMatch.similarity) {
          bestMatch = { similarity, startIndex: i };
      }
  }

  return bestMatch;
}

const fullLyrics = `Everybody loves the things you do
From the way you talk
To the way you move
Everybody here is watching you
Cause you feel like home
You're like a dream come true
But if by chance you're here alone
Can I have a moment
Before I go?
Cause I've been by myself all night long
Hoping you're someone I used to know

You look like a movie
You sound like a song
My God, this reminds me
Of when we were young

Let me photograph you in this light
In case it is the last time
That we might be exactly like we were
Before we realized
We were sad of getting old
It made us restless
It was just like a movie
It was just like a song

I was so scared to face my fears
Cause nobody told me that you'd be here
And I swore you moved overseas
That's what you said, when you left me

You still look like a movie
You still sound like a song
My God, this reminds me
Of when we were young

Let me photograph you in this light
In case it is the last time
That we might be exactly like we were
Before we realized
We were sad of getting old
It made us restless
It was just like a movie
It was just like a song

When we were young

It's hard to win me back
Everything just takes me back
To when you were there
And a part of me keeps holding on
Just in case it hasn't gone

I guess I still care
Do you still care?

It was just like a movie
It was just like a song
My God, this reminds me
Of when we were young

When we were young

Let me photograph you in this light
In case it is the last time
That we might be exactly like we were
Before we realized
We were sad of getting old
It made us restless
I'm so mad I'm getting old
It makes me reckless

It was just like a movie
It was just like a song
When we were young`;

const recognitionText = `Viewing this light in case it is the last time that we might be exactly like we were before we realized we were sad of getting old, it made us stress class..`;

const { similarity, startIndex } = findBestMatch(fullLyrics, recognitionText);

console.log("Similarity:", similarity);
console.log("Start index:", startIndex);
console.log("Best matched portion:", fullLyrics.substring(startIndex, startIndex + recognitionText.length));
