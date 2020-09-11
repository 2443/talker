export const initialState = {
  Rooms: [
    {
      id: 'OECTxpByl',
      lastChatTime: 'Fri Feb 28 2020 12:05:04 GMT+0900 (대한민국 표준시)',
      lastMessage: 'Qui vero aut totam molestias sunt.',
      name: 'quo',
      roomImage: 'https://s3.amazonaws.com/uifaces/faces/twitter/janpalounek/128.jpg',
    },
    {
      id: 'TvF_kvjznO',
      name: 'Vanessa Beatty DDS',
      roomImage: 'https://s3.amazonaws.com/uifaces/faces/twitter/ryanjohnson_me/128.jpg',
      lastMessage: 'Iusto aut dolor dolorem in dicta.',
      lastChatTime: '2020-05-28T22:52:42.898Z',
    },
  ],
  chattingRoom: {},
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

export const LOAD_ROOM = 'LOAD_ROOM';
export const LOAD_ROOM_REQUEST = 'LOAD_ROOM_REQUEST';
export const LOAD_ROOM_SUCCESS = 'LOAD_ROOM_SUCCESS';
export const LOAD_ROOM_FAILURE = 'LOAD_ROOM_FAILURE';

export const CREATE_ROOM = 'CREATE_ROOM';
export const CREATE_ROOM_REQUEST = 'CREATE_ROOM_REQUEST';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_FAILURE = 'CREATE_ROOM_FAILURE';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ROOM_REQUEST:
    case LOAD_ROOMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_ROOM_SUCCESS:
      return {
        ...state,
        chattingRoom: action.payload.data,
        loading: false,
      };
    case LOAD_ROOMS_SUCCESS:
      return {
        ...state,
        Rooms: state.Rooms.concat(action.payload),
        loading: false,
      };
    case LOAD_ROOM_FAILURE:
    case LOAD_ROOMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ROOM_SUCCESS:
      console.log('action.payload.data');
      console.log(action.payload.data);
      console.log(state.Rooms);
      return {
        ...state,
        Rooms: [action.payload.data, ...state.Rooms],
        loading: false,
        done: true,
      };
    case CREATE_ROOM_FAILURE:
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
