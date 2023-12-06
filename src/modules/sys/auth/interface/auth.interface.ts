export interface Login {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshToken {
  data: {
    accessToken: string;
  };
}

export interface NULL {
  data: null;
}
