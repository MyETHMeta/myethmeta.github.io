import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'github-fork-ribbon-css/gh-fork-ribbon.css';
import detectEthereumProvider from "@metamask/detect-provider";

import { createApp } from 'vue'
import ProfilePage from './ProfilePage.vue';

globalThis.__VUE_OPTIONS_API__ = true;
globalThis.__VUE_PROD_DEVTOOLS__ = true;
globalThis.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = true;

function hashChanged() {
    if (window.location.hash) {
        createApp(ProfilePage).mount('main')
    } else {
        document.getElementById('createProfileButton')?.addEventListener('click', async (event) => {
            const ethereum: any = await detectEthereumProvider();
            if (ethereum) {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                const account = accounts[0];
                window.location.href = `./#${account}/edit`;
            } else {
                alert("Please install MetaMask or use a web3 browser!");
            }
        });
    }
}

window.onhashchange = () => {
    hashChanged();
};

hashChanged();





