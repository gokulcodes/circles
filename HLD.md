![Circles poster](https://github.com/gokulcodes/circles/blob/main/poster.png?raw=true)

# Circles

A text based distraction-free personal space for connecting with your closed circles.

### Requirements:

- User signup with Username(Unique), Email & Password
  - Can't afford OTP's to verify email's for now
- User login with Email & Password with Recaptcha3 enabled
- No multimedia support
  - Only text based chat to restrict unwanted abuse
  - since we are not verifying email, it's highly possible to make this platform more vulnerable
- Add friend feature
  - In Circles, there is no social network, user has to enter username of their friends to add friends and chat with them
- Reject friend request
- List all your friends
  - delete a contact and it's chat
- Block friend
- Profile view
  - Auto generated avatar
  - Username
  - about
  - Email address
  - Change password
  - Notification
    - in app notification
  - Delete account
  - Online status
  - Last seen time
  - Block list
    - unblock users
- Chat
  - Common for 1 : 1 chats view & Group chats
    - message card
      - message
      - avatar
      - time
      - actions
        - replay message - messageid
        - delete - not reversable
        - star / unstar
        - pin / unpin
        - react / unreact
          - laugh, cry etc
    - lazy loading when user scrolls to previous chat history
      - pagination required
    - message input box
    - send button
  - 1 : 1 message
    - profile view inside chat
      - avatar
      - name
      - online status
      - last seen
      - typing
      - more info
        - opens a full view panel of a user on the other side
          - avatar
          - username
          - email - if publicaly viewable
          - about
          - block
    - actions
      - Clear history
      - block / unblock
  - Group chat
    - profile view inside chat
      - group avatar
      - name
      - total onlines
      - total typing
    - actions
      - Exit group
      - Add person - admin access
      - Delete group - admin access
      - Kick a person out - admin access
      - Clear history

### Security

- I know this is overkill, but just to be sure that i don't endup paying unwanted server cost
- Rate limiting
- Basic End to End encryption
  - basically, create a public and private key for two users in 1:1 chat
  - public is shared between user's
  - each message is encrypted with opposite person's public key which can be only decrypted by him with his private key
  - here securing private key is main problem - how to secure it?

### Core

- Every Secured API call has to be attached with auth token in cookie
- Use Socket's for messaging / other activiities too
  - Website should update in realtime whenever any server event is sent
- In Frontend we can user server sent events for making the app more reactive

### Tech decisions

- Backend
  - Graphql / Rest API
  - How to do sockets to open multiple socket connections from a server?
  - CI/CD for backend ? - Over engineering for initial days
  - message queues for handling tones of user interactions ? - Over engineering for initial days
  - Host on EC2 instance - Minimal server cost for next 12 months
  - Mongodb? - M0 Serverless instance - Free
  - Domain - api.circles.gokulcodes.dev
- Frontend
  - NextJS
    - App router
    - Middleware for cookie attachments & auth
    - partial server side rendering
  - Vercel for hosting
  - Domain - circles.gokulcodes.dev
