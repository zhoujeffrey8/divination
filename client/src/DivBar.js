import CrystalBall from './CrystalBall.png';


export default function DivBar() {

    return(
        <div class="pl-5 py-5 sticky bottom-10">
        <div class="bg-white  flex items-center rounded-lg shadow-lg">
                                  <div class="p-2 md:p-4">
                <button
                    class="rounded-full focus:outline-none w-20 h-20 md:w-10 md:h-12 flex items-center justify-center">
                    <img src={CrystalBall}
                        class="pokeball" alt="logo" />
                </button>
            </div>
            <input autofocus placeholder="Generate an outline..." name="q"
                class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none text-lg"
                id="search"></input>

        </div>
</div>
    )

}
