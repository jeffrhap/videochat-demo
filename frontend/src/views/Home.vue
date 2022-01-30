<template>
  <div class="page home">
    <div class="full-width">
      <div class="holder">
        <video muted ref="myVideo" class="video current"></video>
        <video ref="oppositeVideo" class="video opposite"></video>
      </div>
    </div>
  </div>
</template>

<script>
import * as Peer from 'peerjs-client';
import { io } from "socket.io-client";

export default {
  name: 'Home',
  data() {
    return {
      socket: null,
      peer: null,
      peers: {},
    }
  },
  computed: {
    
  },
  created() {
    this.socket = io('https://videochat-backend-lw.herokuapp.com/');
    console.log(this.socket)
    this.peer = new Peer({host:'peerjs-server.herokuapp.com', secure:true, port:443});
  },
  mounted() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then(stream => {
      const video = this.$refs.myVideo;
      this.addStream(video, stream);

      this.peer.on('call', call => {
        call.answer(stream);
        const video = this.$refs.oppositeVideo;
        call.on('stream', userVideoStream => {
          this.addStream(video, userVideoStream);
        })
      })

      this.socket.on('user-connected', userId => {
        console.log('user connected', userId)
        this.connectNewUser(userId, stream);
      })
    })

    this.socket.on('user-disconnected', userId => {
      if (this.peers[userId]) this.peers[userId].close();
    })   

    this.peer.on('open', id => {
      this.socket.emit('join-room', '123', id)
    })
  },
  methods: {
    connectNewUser(userId, stream) {
      const call = this.peer.call(userId, stream);
      const video = this.$refs.oppositeVideo;

      call.on('stream', userVideoStream => {
        this.addStream(video, userVideoStream);
      })

      call.on('close', () => {
        this.$refs.oppositeVideo.srcObject = null;
      })

      this.peers[userId] = call;
    },
    addStream(video, stream) {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page.home {
  background-color: black;
  height: 100vh;

  .full-width { 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    .holder {
      display: flex;
      justify-content: center;
      align-items: center;

      .video {
        width: 640px;
        height: 480px;
        object-fit: cover;
      }
    }
  }

  h1 {
    margin-top: 32px;
    margin-bottom: 16px;
    color: white;
  }
}
</style>
