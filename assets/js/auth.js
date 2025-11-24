// assets/js/auth.js
import { supabase } from './supabase.js';

// 1. 페이지 로드 즉시 로그인 체크
async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();

    // 세션(로그인 정보)이 없으면 로그인 페이지로 튕겨냄
    if (!session) {
        // 현재 페이지가 login.html이 아닐 때만 이동
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
    } else {
        // 이미 로그인했는데 login.html에 들어왔다면 대시보드로 보냄
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
        }
    }
}

// 실행
checkSession();


// 2. 로그아웃 기능 (모든 페이지 공통)
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (confirm("로그아웃 하시겠습니까?")) {
                await supabase.auth.signOut();
                window.location.href = 'login.html';
            }
        });
    }
});