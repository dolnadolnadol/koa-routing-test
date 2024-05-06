export interface UserQueryOption {
    user_id: number;
    name?: string;
    email: string;
    isDelete: boolean;
}

// export class ReservationQueryOptionMaker {
//     static makeFromListReservationByRoomQueryParameter(queryParam: ListReservationByRoomQueryParameter) {
//         const option: ReservationQueryOption = {
//             paginationQuery: PaginationQueryMaker.make(queryParam),
//             status: queryParam.status,
//             isCancel: queryParam.isCancel,
//             roomId: queryParam.roomId,
//         };

//         return option;
//     }
//     static makeFromRoomListQueryParams(params: ListReservationQueryParameter) {
//         const option: ReservationQueryOption = {
//             paginationQuery: PaginationQueryMaker.make(params),
//             roomId: params.roomId,
//             status: params.status,
//         };

//         return option;
//     }
// }
