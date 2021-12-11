import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

// can also write the spotify api thingy here if errors....
// import spotifyApi from "../lib/spotify";

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // if refresh token fails, login
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      console.log("SESSION: ", session);

      spotifyAPI.setAccessToken(session?.user?.accessToken);
    }
  }, [session]);

  return spotifyAPI;
}

export default useSpotify;
