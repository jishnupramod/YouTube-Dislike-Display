
const displayDislikes = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setDislikeCount,
  });
};

// The body of this function will be execuetd as a content script inside the
// current page
async function setDislikeCount() {
  const videoId = window.location.href.split("=")[1];
  if (videoId.length < 4) return;

  const KEY = "<API_KEY>"
  
  let URL = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${KEY}&fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics`;
  let ytStrings = document.getElementsByTagName("yt-formatted-string");
  const target = "Dislike";
  let found;

  for (let i = 0; i < ytStrings.length; ++i) {
    if (ytStrings[i].textContent === target) {
      found = ytStrings[i];
      break;
    }
  }

  // console.log(found.innerText);

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      found.innerText = data.items[0].statistics.dislikeCount;
    });
}

displayDislikes();
