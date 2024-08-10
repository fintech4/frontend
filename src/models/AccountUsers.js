// src/models/AccountUsers.js
class AccountUsers {
    constructor(id, kakaoId, email, username, profileImageUrl) {
      this.id = id;
      this.kakaoId = kakaoId;
      this.email = email;
      this.username = username;
      this.profileImageUrl = profileImageUrl;
    }
  
    // 사용자 정보를 요약하는 메서드
    getUserSummary() {
      return `ID: ${this.id}, Username: ${this.username}, Email: ${this.email}`;
    }
  
    // 프로필 이미지 URL을 반환하는 메서드
    getProfileImageUrl() {
      // URL이 없는 경우 빈 문자열을 반환합니다.
      return this.profileImageUrl || "";
    }
  }
  
  export default AccountUsers;
  