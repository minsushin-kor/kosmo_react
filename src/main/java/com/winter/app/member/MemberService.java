package com.winter.app.member;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MemberService {

    private MemberRepository memberRepository;

    public MemberDTO join(MemberDTO memberDTO) throws Exception {
        return memberRepository.save(memberDTO);
    }

    public MemberDTO login(String username, String password) throws Exception {
        java.util.Optional<MemberDTO> memberOpt = memberRepository.findById(username);
        if (memberOpt.isPresent()) {
            MemberDTO member = memberOpt.get();
            if (member.getPassword().equals(password)) {
                return member;
            }
        }
        return null;
    }
}
