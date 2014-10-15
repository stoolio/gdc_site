require 'net/smtp'
require 'json'

CONTACT_INFO = %w(name states phone email)

TO_SUBJECT = {
  'contact' => 'Message',
  'inquiry' => 'Ring Inquiry',
  'lead' => 'Diamond Lead',
  'signup' => 'List Signup'
}

type = ARGV[0]

message = JSON.load(open(ARGV[1]))

def heading(data)
  "<h2>#{data}</h2>"
end

def open_tag
  '<div style='font-family: sans-serif;font-size: 20px;'>'
end

def close_tag
  '</div><br />'
end

def htmlify(data)
  "#{data}<br />"
end

Net::SMTP.start('smtp.webfaction.com', 25, 'localhost', 'galediamonds', '1sh1EAKHTPves9Ur', :login) do |smtp|

  smtp.open_message_stream('gdc-leads@web369.webfaction.com', ['galewebform@gmail.com']) do |f|

    f.puts "From: #{message['e-mail']}"
    f.puts "Reply-To: #{message['e-mail']}"
    f.puts "Return-Path: #{message['e-mail']}"

    f.puts 'To: galewebform@gmail.com'

    f.puts "Subject: #{TO_SUBJECT[type]} from #{message['name']}"

    f.puts 'Content-Type: text/html; charset=UTF-8'
    f.puts 'Content-Transfer-Encoding: 8bit'

    f.puts

    f.puts heading '**Contact Info**'
    f.puts open_tag
    CONTACT_INFO.each do |contact|
      temp = message.delete(contact)
      f.puts htmlify(temp) if temp
    end
    f.puts close_tag

    comments = message.delete('comments')

    f.puts heading '**Other Info**'
    f.puts open_tag
    message.each do |type, data|
      data = data.join(', ') if data.class == Array
      f.puts htmlify("#{type}: #{data}")
    end
    f.puts close_tag

    if comments
      f.puts heading '**Comments**'
      f.puts open_tag
      f.puts htmlify(comments)
      f.puts close_tag
    end

  end

end

# <table width="99%" border="0" cellpadding="1" cellspacing="0" bgcolor="#EAEAEA">
#   <tr>
#     <td>
#       <table width="100%" border="0" cellpadding="5" cellspacing="0" bgcolor="#FFFFFF">
#         <tr bgcolor="#EAF2FA">
#           <td colspan="2">
#             <font style="font-family: sans-serif; font-size:12px;">
#               <strong>Name</strong>
#             </font>
#           </td>
#         </tr>
#         <tr bgcolor="#FFFFFF">
#           <td width="20">
#             &nbsp;
#           </td>
#           <td>
#             <font style="font-family: sans-serif; font-size:12px;">
#               Amit
#             </font>
#           </td>
#         </tr>
#         <tr bgcolor="#EAF2FA">
#           <td colspan="2">
#             <font style="font-family: sans-serif; font-size:12px;">
#               <strong>Email</strong>
#             </font>
#           </td>
#         </tr>
#         <tr bgcolor="#FFFFFF">
#           <td width="20">
#             &nbsp;
#           </td>
#           <td>
#             <font style="font-family: sans-serif; font-size:12px;">
#               <a href='mailto:Bawa.amit@gmail.com'>Bawa.amit@gmail.com</a>
#             </font>
#           </td>
#         </tr>
#       </table>
#     </td>
#   </tr>
# </table>
