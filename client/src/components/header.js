import CrystalBall from '../static/CrystalBall.png';
import {useHotkeys} from 'react-hotkeys-hook';
import App from '../pages/App'
 

export default function Header() {

    return(
        <div class="sticky top-0">
        <div class="bg-white  flex items-center shadow-lg">
                                  <div class="p-2 md:p-4">
                <button
                    class="rounded-full focus:outline-none w-20 h-20 md:w-10 md:h-12 flex items-center justify-center">
                    <img src={CrystalBall}
                        class="pokeball" alt="logo" />
                </button>
            </div>
            <h2 class="font-semibold">Divination</h2>

        </div>
</div>
    )

}
