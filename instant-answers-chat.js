(function () {
  const CHAT_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="white" width="28" height="28" style="margin:auto;height:100%;">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>`;
  const CLOSE_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" width="28" height="28" style="margin:auto;height:100%;">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>`;
  const DEFAULT_BG_COLOR = '#7f00ff';
  const INSTANT_ANSWERS_CHATBOT_ID = instantAnswersParams.chatbotId;

  function init() {
    setTimeout(function () {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('id', 'instant-answers-iframe');
      iframe.src = `https://instantanswers.xyz/chatbots/${INSTANT_ANSWERS_CHATBOT_ID}/iframe`;
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.zIndex = '1000';
      iframe.style.border = 'none';
      iframe.style.bottom = window.innerWidth < 640 ? '0' : '80px';
      iframe.style.right = window.innerWidth < 640 ? '0' : '16px';
      iframe.style.width = window.innerWidth < 640 ? '100%' : '440px';
      iframe.style.height = window.innerWidth < 640 ? '100%' : '70dvh';
      iframe.style.boxShadow =
        '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
      iframe.style.zIndex = '9999999';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const toggleButton = document.createElement('button');
      toggleButton.setAttribute('id', 'instant-answers-bubble');
      toggleButton.style.overflow = 'hidden';
      toggleButton.innerHTML = CHAT_ICON_SVG;
      toggleButton.style.padding = '0';
      toggleButton.style.backgroundColor = DEFAULT_BG_COLOR;
      toggleButton.style.color = 'white';
      toggleButton.style.borderRadius = '9999px';
      toggleButton.style.position = 'fixed';
      toggleButton.style.display = 'none';
      toggleButton.style.justifyContent = 'center';
      toggleButton.style.alignItems = 'center';
      toggleButton.style.bottom = '16px';
      toggleButton.style.right = '16px';
      toggleButton.style.width = '50px';
      toggleButton.style.height = '50px';
      toggleButton.style.zIndex = '9999998';
      toggleButton.style.border = 'none';
      toggleButton.style.cursor = 'pointer';
      toggleButton.style.transition = 'all .3s ease-in-out';
      toggleButton.style.boxShadow =
        '0px 10px 15px -3px rgb(0 0 0 / 0.1), 0px 4px 6px -4px rgb(0 0 0 / 0.1)';
      document.body.appendChild(toggleButton);

      const messageBubbles = document.createElement('div');
      messageBubbles.setAttribute('id', 'ia-message-bubbles');
      messageBubbles.style.position = 'fixed';
      messageBubbles.style.bottom = '70px';
      messageBubbles.style.borderRadius = '10px';
      messageBubbles.style.fontFamily = 'sans-serif';
      messageBubbles.style.fontSize = '16px';
      messageBubbles.style.zIndex = 999999997;
      messageBubbles.style.cursor = 'pointer';
      messageBubbles.style.flexDirection = 'column';
      messageBubbles.style.gap = '50px';
      messageBubbles.style.marginLeft = '20px';
      messageBubbles.style.maxWidth = '70vw';
      messageBubbles.style.display = 'none';
      messageBubbles.style.right = '16px';

      const messageBubblesCloseButton = document.createElement('div');
      messageBubblesCloseButton.innerHTML = '&#10005;';
      messageBubblesCloseButton.style.position = 'absolute';
      messageBubblesCloseButton.style.top = '-7px';
      messageBubblesCloseButton.style.right = '-7px';
      messageBubblesCloseButton.style.fontWeight = 'bold';
      messageBubblesCloseButton.style.display = 'none';
      messageBubblesCloseButton.style.justifyContent = 'center';
      messageBubblesCloseButton.style.alignItems = 'center';
      messageBubblesCloseButton.style.zIndex = 999999996;
      messageBubblesCloseButton.style.width = '22px';
      messageBubblesCloseButton.style.height = '22px';
      messageBubblesCloseButton.style.borderRadius = '50%';
      messageBubblesCloseButton.style.textAlign = 'center';
      messageBubblesCloseButton.style.fontSize = '12px';
      messageBubblesCloseButton.style.cursor = 'pointer';

      messageBubbles.appendChild(messageBubblesCloseButton);

      document.body.appendChild(messageBubbles);

      toggleButton.onclick = () => {
        if (iframe.style.display === 'none') {
          iframe.contentWindow.postMessage({ openChat: true }, '*');
          iframe.style.display = 'block';
          toggleButton.innerHTML = CLOSE_ICON_SVG;
          messageBubbles.style.display = 'none';
        } else {
          iframe.contentWindow.postMessage({ closeChat: true }, '*');
          iframe.style.display = 'none';
          toggleButton.innerHTML = CHAT_ICON_SVG;
        }
      };

      toggleButton.addEventListener('mouseenter', (event) => {
        toggleButton.style.transform = 'scale(1.09)';
      });
      toggleButton.addEventListener('mouseleave', (event) => {
        toggleButton.style.transform = 'scale(1)';
      });

      messageBubbles.addEventListener('click', () => {
        messageBubbles.style.display = 'none';
        iframe.style.display = 'block';
        toggleButton.innerHTML = CLOSE_ICON_SVG;
      });

      // Update iframe height on window resize
      window.addEventListener('resize', () => {
        iframe.style.bottom = window.innerWidth < 640 ? '0' : '5rem';
        iframe.style.right = window.innerWidth < 640 ? '0' : '1rem';
        iframe.style.width = window.innerWidth < 640 ? '100%' : '448px';
        iframe.style.height = window.innerWidth < 640 ? '100%' : '80vh';
      });

      window.addEventListener('message', (event) => {
        if (
          event.origin !== 'https://instantanswers.xyz' &&
          event.origin !== 'http://localhost:3002'
        ) {
          return;
        }
        if (event.data.type === 'closeChat') {
          iframe.style.display = 'none';
          toggleButton.innerHTML = CHAT_ICON_SVG;
        }

        if (event.data.type === 'initChat') {
          const { chatColor, initialMessages, showInitialMessages } =
            event.data;

          toggleButton.style.backgroundColor = chatColor;
          toggleButton.style.display = 'block';

          initialMessages.forEach((message, index) => {
            const messageElementContainer = document.createElement('div');
            messageElementContainer.style.display = 'flex';
            messageElementContainer.style.justifyContent = 'flex-end';
            const messageElement = document.createElement('div');
            messageElement.style.backgroundColor = 'white';
            messageElement.style.color = 'black';
            messageElement.style.boxShadow =
              'rgba(0, 0, 0, 0.09) 0px 5px 15px 0px, rgba(0, 0, 0, 0.09) 0px 0px 0px 1px';

            messageElement.style.borderRadius = '0.75rem';
            messageElement.style.padding = '0.75rem';
            messageElement.style.margin = '0.30rem';
            messageElement.style.fontSize = '14px';
            messageElement.innerText = message.text;
            messageElement.style.opacity = 0;

            messageElement.style.transform = 'scale(0.9)';
            messageElement.style.transition =
              'opacity 0.5s ease, transform 0.5s ease';

            messageElementContainer.appendChild(messageElement);
            messageBubbles.appendChild(messageElementContainer);

            if (showInitialMessages) {
              setTimeout(() => {
                if (sessionStorage.getItem('InitialMessagesShown') === 'true')
                  return;
                if (index === 0) {
                  messageBubbles.style.display = 'block';
                }
                messageElement.style.opacity = 1;
                messageElement.style.transform = 'scale(1)';
                if (index === initialMessages.length - 1) {
                  sessionStorage.setItem('InitialMessagesShown', 'true');
                }
              }, 1000 + index * 200);
            }
          });

          messageBubblesCloseButton.style.backgroundColor = chatColor;
          messageBubblesCloseButton.style.color = 'white';
          messageBubblesCloseButton.style.boxShadow =
            '0px 10px 15px -3px rgb(0 0 0 / 0.1), 0px 4px 6px -4px rgb(0 0 0 / 0.1)';
          messageBubbles.addEventListener('mouseenter', () => {
            messageBubblesCloseButton.style.display = 'flex';
          });
          messageBubbles.addEventListener('mouseleave', () => {
            messageBubblesCloseButton.style.display = 'none';
          });

          messageBubblesCloseButton.addEventListener('click', (event) => {
            event.stopPropagation();
            messageBubbles.style.display = 'none';
          });
        }
      });
    }, 1500);
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();
