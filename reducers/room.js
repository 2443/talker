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
