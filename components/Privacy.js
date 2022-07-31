import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from "react-native";

export default function Privacy({navigation}) {
  return (
    <>
    <ImageBackground source={require('../assets/images/privacyBg.jpg')}  style={{
          flex: 1,
          marginTop: 30,
          backgroundColor: "white",
          justifyContent: "center",
          opacity:1
        }}>

      <View
       
      >
        <Text
          style={{
            alignSelf: "center",
            bottom: 40,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
         Privacy and terms and conditions
        </Text>
        <View
          style={{
            width: "70%",
            height: "80%",
            borderWidth: 5,
            borderColor: "#0077b6",
            padding: 10,
            alignSelf: "center",
          }}
        >
          <ScrollView>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 15,
              }}
            >
              General. This Privacy Policy describes how we,TekHealth, Inc., a
              KNUST corporation, collect, use, and handle your information when
              you use our website and services. We are committed to protecting
              and respecting your privacy and ensuring that your personal data
              is processed fairly and lawfully in line with all relevant privacy
              legislation.
            </Text>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 15,
              }}
            >
              If you have any questions about this privacy policy, including any
              requests to exercise your legal rights please send an email with a
              subject of “TekHealth– Privacy Policy Inquiry” to
              website-privacy-policy-inquiry TekHealth com.
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Information Sharing and Disclosure
              </Text>
              <Text
                style={{
                  marginBottom: 20,
                  fontSize: 15,
                }}
              >
                We have customers all over the world but to provide you with our
                services, we transmit your personal data to a backend server .
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Sharing of Personal Information.
              </Text>
              <Text
                style={{
                  marginBottom: 20,
                  fontSize: 15,
                }}
              >
                TekHealth does not rent, sell, or share personal information
                about you with nonaffiliated persons or companies except to
                provide products or services you’ve requested, when we have your
                permission, or under the following circumstances: We may provide
                the information to trusted partners who work on behalf of or
                with TekHealth under confidentiality
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                CONFIDENTIALITY AND SECURITY
              </Text>
              <Text
                style={{
                  marginBottom: 20,
                  fontSize: 15,
                }}
              >
                Limited Access to Information. Required Disclosure: Motio may
                share personal information with other companies, lawyers, credit
                bureaus, agents or government agencies in the following cases:
                Harm.
              </Text>
            </View>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Law Enforcement.
            </Text>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              SSL-Encryption.
            </Text>
            <View>
              <Text
                style={{
                  marginBottom: 20,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                CHANGES TO THIS PRIVACY POLICY
              </Text>
              <Text
                style={{
                  marginBottom: 20,
                  fontSize: 15,
                }}
              >
                Updates to the Policy. TekHealth reserves the right to change
                this Privacy Policy at any time by posting revisions to our
                Email page. Such changes will be effective upon posting.
              </Text>
            </View>
            <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                    QUESTIONS AND SUGGESTIONS
                </Text>
                <Text
                style={{
                    marginBottom: 20,
                    fontSize: 15,
                }}
                >
                Feedback. If you have questions or
                suggestions, please complete the “Contact Us” form.
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Signin')}>
                    <Text style={{
                        color:'#0077b6',
                        fontSize:18,
                        alignSelf:'flex-end'
                    }}>Agree & Proceed</Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
    </>
  );
}

