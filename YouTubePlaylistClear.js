// 	Instructions:
// 		1. Update playlist variable as applicable
// 		2. Update timeDelay variable as applicable, increase time for poor performance
// 		3. Open playlist page in Chrome and open Developer Tools
// 		4. In Dev Tools > Console window, enter command "allow pasting" (first time only)
// 		5. Copy code and paste into Console window and execute
// 		6. Should remove the first 100 videos, reload window and repeat as needed


// ----- BEGIN CODE TO COPY ----- //
var playlist 	= 'Watch later'; 	// Set playlist name
var timeDelay 	= 250; 				// increase time delay as needed

function removeVideos() {
	const videos = document.querySelectorAll('ytd-playlist-video-renderer');

	if (videos.length === 0) {
		console.log('No videos found in Watch Later or all videos are already removed.');
		return;
	}

	let index = 0;

	function processVideo() {
		if (index < videos.length) {
			console.log(`Processing video ${index + 1}/${videos.length}...`);

			// Locate the menu button for the current video
			var mBtnSel = 'button#button[aria-label="Action menu"]';
			const menuButton = videos[index].querySelector(mBtnSel);

			if (menuButton) {
				menuButton.click();

				setTimeout(() => {
					// Locate the "Remove from Watch Later" option by matching text
					var rBtnSel = 'tp-yt-paper-item.style-scope.ytd-menu-service-item-renderer'
					const removeButton = Array.from(
						document.querySelectorAll(rBtnSel)
					).find(item => item.textContent.trim() === `Remove from ${playlist}`);

					if (removeButton) {
						removeButton.click();
						console.log(`Removed video ${index + 1}/${videos.length}`);
						index++;
						setTimeout(processVideo, timeDelay); // Delay for YouTube to update
					} else {
						console.log('Remove button not found, moving to next video.');
						index++;
						setTimeout(processVideo, timeDelay);
					}
				}, 500); // Wait for the dropdown menu to render
			} else {
				console.log(`Menu button not found for video ${index + 1}, skipping.`);
				index++;
				setTimeout(processVideo, timeDelay);
			}
		} else {
			console.log('Finished processing all videos.');
		}
	}

	processVideo();
}

removeVideos();
// ----- END CODE TO COPY ----- //


// Original code: https://www.reddit.com/r/youtube/comments/1gtlcft/automate_clearing_your_youtube_watch_later/