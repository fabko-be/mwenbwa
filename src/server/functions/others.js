// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "Connection error:"));
// db.once("open", async () => {
//     try {
//         const treeArray = await Trees.find(/*{condition par exemple   owner: null}*/);
//         treeArray.forEach(async element => {
//             try {
//                 await Trees.updateOne(
//                     /*Peut aussi être deleteOne par exemple*/
//                     {_id: element.id},
//                     /*Dans le cas d'un delete one, passer directement au catch à partir de cette ligne*/
//                     {
//                         $set: {
//                             comments: [],
//                         },
//                     },
//                 );
//             } catch (error) {
//                 console.log(error);
//             }
//         });
//     } catch (error) {
//         console.log(error);
//     }
// });
