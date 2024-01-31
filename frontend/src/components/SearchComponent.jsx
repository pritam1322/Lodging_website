export default function SearchComponent() {
    return (
        <form className="max-w-lg">
            <div className="relative">
                
                <input
                type="text"
                placeholder="Search"
                className="w-full py-3 pl-12 text-gray-500 border rounded-lg outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                />
            </div>
        </form>
    );
}