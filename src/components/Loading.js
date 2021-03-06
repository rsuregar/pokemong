const Loading = (loop) => {
// console.log(loop)
const looping = Array(loop.loop).fill('')
// console.table(looping)
    return (
        <>
        <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-6 mt-4">
            {looping.map((i, y) => (
                 <div key={y} className="flex justify-center text-6xl"
                 >
                     <div className="rounded-md p-4 max-w-sm w-full mx-auto mb-3">
                         <div className="animate-pulse flex space-x-4">
                             <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                             <div className="flex-1 space-y-6 py-1">
                             <div className="h-2 bg-slate-200 rounded"></div>
                             <div className="space-y-3">
                                 <div className="grid grid-cols-3 gap-4">
                                 <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                 <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                 </div>
                                 <div className="h-2 bg-slate-200 rounded"></div>
                             </div>
                             </div>
                         </div>
                     </div>
                 </div>
            ))}
               
            </div>
        </div>

        {/* {looping.map((i, y) => (
        <div key={y} className="border shadow rounded-md p-4 max-w-sm w-full mx-auto mb-3">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                </div>
                </div>
            </div>
        </div>
        
        ))} */}
        </>
        
    );
}; 

export default Loading;