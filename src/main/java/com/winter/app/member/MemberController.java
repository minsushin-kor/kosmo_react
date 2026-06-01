package com.winter.app.member;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/member/*")
@AllArgsConstructor
public class MemberController {

    private MemberService memberService;

    // In-memory token store mapping TOKEN -> MemberDTO
    private static final Map<String, MemberDTO> tokenStore = new ConcurrentHashMap<>();

    @PostMapping("join")
    public void join(@RequestBody MemberDTO memberDTO) throws Exception{
        System.out.println("join: " + memberDTO);
        memberService.join(memberDTO);
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) throws Exception {
        String username = credentials.get("username");
        String password = credentials.get("password");

        MemberDTO member = memberService.login(username, password);
        if (member != null) {
            // Generate a secure session token
            String token = "MAUM-TOKEN-" + UUID.randomUUID().toString();
            tokenStore.put(token, member);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", member.getUsername());
            response.put("name", member.getName());
            response.put("email", member.getEmail());

            System.out.println("User " + username + " successfully logged in. Token issued: " + token);
            return ResponseEntity.ok(response);
        } else {
            System.out.println("Failed login attempt for user: " + username);
            return ResponseEntity.status(401).body("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    }

    @GetMapping("me")
    public ResponseEntity<?> me(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            MemberDTO member = tokenStore.get(token);
            if (member != null) {
                return ResponseEntity.ok(member);
            }
        }
        return ResponseEntity.status(401).body("유효하지 않은 토큰입니다. 다시 로그인해 주세요.");
    }
}
