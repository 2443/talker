export const initialState = {
  Rooms: [
    {
      id: 'OECTxpByl',
      lastChatTime: 'Fri Feb 28 2020 12:05:04 GMT+0900 (대한민국 표준시)',
      lastMessage: 'Qui vero aut totam molestias sunt.',
      name: 'quo',
      roomImage: 'https://s3.amazonaws.com/uifaces/faces/twitter/janpalounek/128.jpg',
    },
  ],
  filteredRooms: [],
  // 공용
  loading: false,
  done: false,
  error: null,
  //
};

export const FILTER_ROOMS = 'FILTER_ROOMS';
export const LOAD_ROOMS = 'LOAD_ROOMS';
export const LOAD_ROOMS_REQUEST = 'LOAD_ROOMS_REQUEST';
export const LOAD_ROOMS_SUCCESS = 'LOAD_ROOMS_SUCCESS';
export const LOAD_ROOMS_FAILURE = 'LOAD_ROOMS_FAILURE';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ROOMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_ROOMS_SUCCESS:
      return {
        ...state,
        Rooms: state.Rooms.concat(action.payload),
        loading: false,
      };
    case LOAD_ROOMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FILTER_ROOMS:
      const keyword = action.payload.toLowerCase().trim();
      return {
        ...state,
        filteredRooms: state.Rooms.filter((room) => room.name.toLowerCase().includes(keyword)),
      };
    default:
      return state;
  }
};

export default reducer;
