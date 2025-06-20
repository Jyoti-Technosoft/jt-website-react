import React from "react";
import { Box, Container, Typography, List, ListItem, Link } from "@mui/material";
import GamepadIcon from '@mui/icons-material/Gamepad'

import HeaderCommonPage from "./shared/HeaderCommonPage.tsx";
import "../../styles/privacy-policy.css";

const PrivacyPolicy: React.FC = () => {
  return (
    <Box className="privacy-policy" mb={4}>
      <HeaderCommonPage smallTitle="Privacy Policy" page="Privacy Policy" />
      <Container className="privacy-policy-container">
        <Typography className="last-updated-date" mt={4}>
          Last updated: April 02, 2024
        </Typography>
        <Typography mt={4} className="header-description">
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </Typography>
        <Typography mt={4} className="header-description">
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.
        </Typography>

        <Box mt={4} borderBottom="1px solid #ccc" width="100%" />

        <Typography className="privacy-first-section-header" mt={4}>
          Interpretation and Definitions
        </Typography>
        <Typography className="privacy-first-section-sub-header" mt={4}>
          Interpretation
        </Typography>
        <Typography className="header-description" mt={2}>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </Typography>
        <Typography className="privacy-first-section-sub-header" mt={4}>
          Definitions
        </Typography>
        <Typography className="header-description" mt={2}>
          For the purposes of this Privacy Policy:
        </Typography>
        <List>
          <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
              <Typography className="header-description">
                <strong>Account</strong> means a unique account created for You
                to access our Service or parts of our Service.
              </Typography>
            </Box>
          </ListItem>

          <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
              <Typography className="header-description">
                <strong>Affiliate</strong> means an entity that controls, is
                controlled by or is under common control with a party, where
                "control" means ownership of 50% or more of the shares, equity
                interest or other securities entitled to vote for election of
                directors or other managing authority.
              </Typography>
            </Box>
          </ListItem>

          <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
              <Typography className="header-description">
                <strong>Company</strong> (referred to as either "the Company",
                "We", "Us" or "Our" in this Agreement) refers to Jyoti
                Technosoft LLP, 228, Second Floor, Green Elina, Nr. Sneh
                Sankul's Vadi, Anand Mahal Rd, Giriraj Society, Adajan, Surat
                395009, Gujarat, India.
              </Typography>
            </Box>
          </ListItem>

          <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
              <Typography className="header-description">
                <strong>Cookies</strong> are small files that are placed on Your
                computer, mobile device or any other device by a website,
                containing the details of Your browsing history on that website
                among its many uses.
              </Typography>
            </Box>
          </ListItem>

          <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
              <Typography className="header-description">
                <strong>Country</strong> refers to: Gujarat, India
              </Typography>
            </Box>
          </ListItem>

          <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
              <Typography className="header-description">
                <strong>Device</strong> means any device that can access the
                Service such as a computer, a cellphone or a digital tablet.
              </Typography>
            </Box>
          </ListItem>

          <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
              <Typography className="header-description">
                <strong>Personal Data</strong> is any information that relates
                to an identified or identifiable individual.
              </Typography>
            </Box>
          </ListItem>

          <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
              <Typography className="header-description">
                <strong>Service</strong> refers to the Website.
              </Typography>
            </Box>
          </ListItem>

          <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
              <Typography className="header-description">
                <strong>Service Provider</strong> means any natural or legal
                person who processes the data on behalf of the Company. It
                refers to third-party companies or individuals employed by the
                Company to facilitate the Service, to provide the Service on
                behalf of the Company, to perform services related to the
                Service or to assist the Company in analyzing how the Service is
                used.
              </Typography>
            </Box>
          </ListItem>

          <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
              <Typography className="header-description">
                <strong>Usage Data</strong> refers to data collected
                automatically, either generated by the use of the Service or
                from the Service infrastructure itself (for example, the
                duration of a page visit).
              </Typography>
            </Box>
          </ListItem>

          <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
              <Typography className="header-description">
                <strong>Website</strong> refers to Jyoti Technosoft LLP,
                accessible from{" "}
                <Link
                  href="https://jyotitechnosoft.com/"
                  rel="external nofollow noopener"
                  target="_blank"
                >
                  https://jyotitechnosoft.com/
                </Link>
              </Typography>
            </Box>
          </ListItem>

          <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
              <Typography className="header-description">
                <strong>You</strong> means the individual accessing or using the
                Service, or the company, or other legal entity on behalf of
                which such individual is accessing or using the Service, as
                applicable.
              </Typography>
            </Box>
          </ListItem>
        </List>
        <Typography className="privacy-first-section-header" mt={4}>Collecting and Using Your Personal Data</Typography>
        <Typography mt={2} className="privacy-first-section-sub-header">Types of Data Collected</Typography>
        <Typography mt={3} className="privacy-first-section-sub-header">Personal Data</Typography>
        <Typography mt={2} className="header-description">
          While using Our Service, We may ask You to provide Us with certain
          personally identifiable information that can be used to contact or
          identify You. Personally identifiable information may include, but is
          not limited to:
        </Typography>
        <List>
        <ListItem disableGutters>
            <Box display="flex" alignItems="center" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC" }} />
            <Typography className="header-description">Email address</Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="center" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC" }} />
            <Typography className="header-description">First name and last name</Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="center" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC" }} />
            <Typography className="header-description">Phone number</Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="center" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC" }} />
            <Typography className="header-description">Address, State, Province, ZIP/Postal code, City</Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="center" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC" }} />
            <Typography className="header-description">Usage Data</Typography>
            </Box>
        </ListItem>
        </List>
        <Typography mt={2} className="privacy-first-section-sub-header">Usage Data</Typography>
        <Typography mt={2} className="header-description">Usage Data is collected automatically when using the Service.</Typography>
        <Typography mt={2} className="header-description">
          Usage Data may include information such as Your Device's Internet
          Protocol address (e.g. IP address), browser type, browser version, the
          pages of our Service that You visit, the time and date of Your visit,
          the time spent on those pages, unique device identifiers and other
          diagnostic data.
        </Typography>
        <Typography mt={2} className="header-description">
          When You access the Service by or through a mobile device, We may
          collect certain information automatically, including, but not limited
          to, the type of mobile device You use, Your mobile device unique ID,
          the IP address of Your mobile device, Your mobile operating system,
          the type of mobile Internet browser You use, unique device identifiers
          and other diagnostic data.
        </Typography>
        <Typography mt={2} className="header-description">
          We may also collect information that Your browser sends whenever You
          visit our Service or when You access the Service by or through a
          mobile device.
        </Typography>
        <Typography mt={4} className="privacy-first-section-sub-header">Tracking Technologies and Cookies</Typography>
        <Typography mt={2} className="header-description">
          We use Cookies and similar tracking technologies to track the activity
          on Our Service and store certain information. Tracking technologies
          used are beacons, tags, and scripts to collect and track information
          and to improve and analyze Our Service. The technologies We use may
          include:
        </Typography>
        <List>
        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>Cookies or Browser Cookies.</strong> A cookie is a small
                file placed on Your Device. You can instruct Your browser to refuse
                all Cookies or to indicate when a Cookie is being sent. However, if
                You do not accept Cookies, You may not be able to use some parts of
                our Service. Unless you have adjusted Your browser setting so that
                it will refuse Cookies, our Service may use Cookies.
            </Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>Web Beacons.</strong> Certain sections of our Service and
                our emails may contain small electronic files known as web beacons
                (also referred to as clear gifs, pixel tags, and single-pixel gifs)
                that permit the Company, for example, to count users who have
                visited those pages or opened an email and for other related website
                statistics (for example, recording the popularity of a certain
                section and verifying system and server integrity).
            </Typography>
            </Box>
        </ListItem>
        </List>
        <Typography mt={2} className="header-description">
          Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies.
          Persistent Cookies remain on Your personal computer or mobile device
          when You go offline, while Session Cookies are deleted as soon as You
          close Your web browser.
        </Typography>
        <Typography mt={2} className="header-description">
          We use both Session and Persistent Cookies for the purposes set out
          below:
        </Typography>
        <List>
        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Box>
                <Typography className="last-updated-date">Necessary / Essential Cookies</Typography>
                <Typography className="header-description" mt={2}>Type: Session Cookies</Typography>
                <Typography className="header-description" mt={2}>Administered by: Us</Typography>
                <Typography className="header-description" mt={2}>
                Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
                </Typography>
            </Box>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Box>
                <Typography className="last-updated-date">Cookies Policy / Notice Acceptance Cookies</Typography>
                <Typography className="header-description" mt={2}>Type: Persistent Cookies</Typography>
                <Typography className="header-description" mt={2}>Administered by: Us</Typography>
                <Typography className="header-description" mt={2}>
                Purpose: These Cookies identify if users have accepted the use of cookies on the Website.
                </Typography>
            </Box>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Box>
                <Typography className="last-updated-date">Functionality Cookies</Typography>
                <Typography className="header-description" mt={2}>Type: Persistent Cookies</Typography>
                <Typography className="header-description" mt={2}>Administered by: Us</Typography>
                <Typography className="header-description" mt={2}>
                Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
                </Typography>
            </Box>
            </Box>
        </ListItem>
        </List>
        <Typography mt={2} className="header-description">
          For more information about the cookies we use and your choices
          regarding cookies, please visit our Cookies Policy or the Cookies
          section of our Privacy Policy.
        </Typography>
        <Typography mt={4} className="privacy-first-section-sub-header">Use of Your Personal Data</Typography>
        <Typography mt={2} className="header-description">The Company may use Personal Data for the following purposes:</Typography>
        <List>
        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.
            </Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.
            </Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.
            </Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.
            </Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.
            </Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>To manage Your requests:</strong> To attend and manage Your requests to Us.
            </Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.
            </Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.
            </Typography>
            </Box>
        </ListItem>
        </List>
        <Typography mt={2} className="header-description">
          We may share Your personal information in the following situations:
        </Typography>
        <List>
        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.
            </Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.
            </Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.
            </Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.
            </Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.
            </Typography>
            </Box>
        </ListItem>

        <ListItem disableGutters>
            <Box display="flex" alignItems="flex-start" gap={1}>
            <GamepadIcon sx={{ fontSize: 14, color: "#347CCC", mt: "4px" }} />
            <Typography className="header-description">
                <strong>With Your consent:</strong> We may disclose Your personal information for any other purpose with Your consent.
            </Typography>
            </Box>
        </ListItem>
        </List>
        <Typography mt={2} className="privacy-first-section-sub-header">Retention of Your Personal Data</Typography>
        <Typography mt={2} className="header-description">
          The Company will retain Your Personal Data only for as long as is
          necessary for the purposes set out in this Privacy Policy. We will
          retain and use Your Personal Data to the extent necessary to comply
          with our legal obligations (for example, if we are required to retain
          your data to comply with applicable laws), resolve disputes, and
          enforce our legal agreements and policies.
        </Typography>
        <Typography mt={2} className="header-description">
          The Company will also retain Usage Data for internal analysis
          purposes. Usage Data is generally retained for a shorter period of
          time, except when this data is used to strengthen the security or to
          improve the functionality of Our Service, or We are legally obligated
          to retain this data for longer time periods.
        </Typography>
        <Typography mt={2} className="privacy-first-section-sub-header">Transfer of Your Personal Data</Typography>
        <Typography mt={2} className="header-description">
          Your information, including Personal Data, is processed at the
          Company's operating offices and in any other places where the parties
          involved in the processing are located. It means that this information
          may be transferred to — and maintained on — computers located outside
          of Your state, province, country or other governmental jurisdiction
          where the data protection laws may differ than those from Your
          jurisdiction.
        </Typography>
        <Typography mt={2} className="header-description">
          Your consent to this Privacy Policy followed by Your submission of
          such information represents Your agreement to that transfer.
        </Typography>
        <Typography mt={2} className="header-description">
          The Company will take all steps reasonably necessary to ensure that
          Your data is treated securely and in accordance with this Privacy
          Policy and no transfer of Your Personal Data will take place to an
          organization or a country unless there are adequate controls in place
          including the security of Your data and other personal information.
        </Typography>
        <Typography mt={2} className="privacy-first-section-sub-header">Delete Your Personal Data</Typography>
        <Typography mt={2} className="header-description">
          You have the right to delete or request that We assist in deleting the
          Personal Data that We have collected about You.
        </Typography>
        <Typography mt={2} className="header-description">
          Our Service may give You the ability to delete certain information
          about You from within the Service.
        </Typography>
        <Typography mt={2} className="header-description">
          You may update, amend, or delete Your information at any time by
          signing in to Your Account, if you have one, and visiting the account
          settings section that allows you to manage Your personal information.
          You may also contact Us to request access to, correct, or delete any
          personal information that You have provided to Us.
        </Typography>
        <Typography mt={2} className="header-description">
          Please note, however, that We may need to retain certain information
          when we have a legal obligation or lawful basis to do so.
        </Typography>
        <Typography mt={2} className="privacy-first-section-sub-header">Disclosure of Your Personal Data</Typography>
        <Typography mt={2} className="header-description">
          We do not sell, trade, or otherwise transfer your personal information
          to outside parties unless we provide you with advance notice. This
          does not include trusted third parties who assist us in operating our
          website, conducting our business, or servicing you, as long as those
          parties agree to keep this information confidential.
        </Typography>
        <Typography mt={2} className="privacy-first-section-sub-header">Security of Your Personal Data</Typography>
        <Typography mt={2} className="header-description">
          The security of Your Personal Data is important to Us, but remember
          that no method of transmission over the Internet, or method of
          electronic storage is 100% secure. While We strive to use commercially
          acceptable means to protect Your Personal Data, We cannot guarantee
          its absolute security.
        </Typography>
        <Typography className="privacy-first-section-header" mt={4}>Children's Privacy</Typography>
        <Typography mt={2} className="header-description">
          Our Service does not address anyone under the age of 13. We do not
          knowingly collect personally identifiable information from anyone
          under the age of 13. If You are a parent or guardian and You are aware
          that Your child has provided Us with Personal Data, please contact Us.
          If We become aware that We have collected Personal Data from anyone
          under the age of 13 without verification of parental consent, We take
          steps to remove that information from Our servers.
        </Typography>
        <Typography mt={2} className="header-description">
          If We need to rely on consent as a legal basis for processing Your
          information and Your country requires consent from a parent, We may
          require Your parent's consent before We collect and use that
          information.
        </Typography>
        <Typography className="privacy-first-section-header" mt={4}>Links to Other Websites</Typography>
        <Typography mt={2} className="header-description">
          Our Service may contain links to other websites that are not operated
          by Us. If You click on a third party link, You will be directed to
          that third party's site. We strongly advise You to review the Privacy
          Policy of every site You visit.
        </Typography>
        <Typography mt={2} className="header-description">
          We have no control over and assume no responsibility for the content,
          privacy policies or practices of any third party sites or services.
        </Typography>
        <Typography className="privacy-first-section-header" mt={4}>Changes to this Privacy Policy</Typography>
        <Typography mt={2} className="header-description">
          We may update Our Privacy Policy from time to time. We will notify You
          of any changes by posting the new Privacy Policy on this page.
        </Typography>
        <Typography mt={2} className="header-description">
          We will let You know via email and/or a prominent notice on Our
          Service, prior to the change becoming effective and update the
          &quot;April 02, 2024 &quot; date at the top of this Privacy Policy.
        </Typography>
        <Typography mt={2} className="header-description">
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </Typography>
        <Typography className="privacy-first-section-header" mt={4}>Contact Us</Typography>
        <Typography mt={2} className="header-description">
          If you have any questions about this Privacy Policy, You can go to our
          page to contact us:
          <Link
            href="https://jyotitechnosoft.com/contact-us"
            rel="external nofollow noopener"
            target="_blank"
          >
            https://jyotitechnosoft.com/contact-us
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
