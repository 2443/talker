export const initialState = {
  Rooms: [],
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

export const UPDATE_ROOM = 'UPDATE_ROOM';
export const UPDATE_ROOM_REQUEST = 'UPDATE_ROOM_REQUEST';
export const UPDATE_ROOM_SUCCESS = 'UPDATE_ROOM_SUCCESS';
export const UPDATE_ROOM_FAILURE = 'UPDATE_ROOM_FAILURE';

export const UPLOAD_ROOM_IMAGE = 'UPLOAD_ROOM_IMAGE';
export const UPLOAD_ROOM_IMAGE_REQUEST = 'UPLOAD_ROOM_IMAGE_REQUEST';
export const UPLOAD_ROOM_IMAGE_SUCCESS = 'UPLOAD_ROOM_IMAGE_SUCCESS';
export const UPLOAD_ROOM_IMAGE_FAILURE = 'UPLOAD_ROOM_IMAGE_FAILURE';

export const GET_USER = 'GET_USER';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const REMOVE_ROOM_IMAGE = 'REMOVE_ROOM_IMAGE';

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
        Rooms: action.payload.data,
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
    case UPDATE_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ROOM_SUCCESS:
      return {
        ...state,
        chattingRoom: { ...state.chattingRoom, ...action.payload.data },
        loading: false,
        done: true,
      };
    case UPDATE_ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPLOAD_ROOM_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_ROOM_IMAGE_SUCCESS:
      return {
        ...state,
        chattingRoom: { ...state.chattingRoom, roomImage: action.payload.data },
        loading: false,
        done: true,
      };
    case UPLOAD_ROOM_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        chattingRoom: action.payload.data,
        loading: false,
        done: true,
      };
    case GET_USER_FAILURE:
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
    case REMOVE_ROOM_IMAGE:
      return {
        ...state,
        chattingRoom: { ...state.chattingRoom, roomImage: null },
      };
    default:
      return state;
  }
};

export default reducer;
